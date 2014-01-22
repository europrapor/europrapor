<?php

$maps = ['joy', 'fear', 'determination', 'anger'];
$response = '';
$input = file_get_contents('php://input');
$select_timespan = '04:00:00';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (preg_match('/^\/map\/(\w+)$/', $_SERVER['SCRIPT_NAME'], $matches) && in_array($matches[1], $maps)) {
        include('mysql_pdo_conn.php');
        $sql = 'SELECT id, '.$matches[1].' FROM beta_rows WHERE time > ADDTIME(NOW(), \'-'.$select_timespan.'\')';
        $rows = $conn->query($sql);

        $response = array();
        while ($row = $rows -> fetch(PDO::FETCH_NUM)) {
            $heat = [
                'id' => intval($row[0]),
                'heat' => intval($row[1])
            ];

            array_push($response, $heat);
        }
    }

    switch ($_SERVER['SCRIPT_NAME']) {
        case '/maps':
            $response = array();
            foreach ($maps as $map_id) {
                array_push($response, ['map_id' => $map_id]);
            }
            break;
        case '/map':
            include('mysql_pdo_conn.php');
            // 0.00015 ~ 15 meters
            $sql = 'SELECT r1.id, r1.lt, r1.lg, r1.privacy
                FROM beta_rows AS r1, beta_rows AS r2
                WHERE r1.time > ADDTIME(NOW(), \'-'.$select_timespan.'\')
                AND r2.time > ADDTIME(NOW(), \'-'.$select_timespan.'\')
                AND r1.lt <= (r2.lt + 0.00015)
                AND r1.lt >= (r2.lt - 0.00015)
                AND r1.lg <= (r2.lg + 0.00015)
                AND r1.lg >= (r2.lg - 0.00015)
                GROUP BY r1.id
                HAVING COUNT(r2.id) >= r1.privacy;';
            $rows = $conn->query($sql);

            $response = array();
            while ($row = $rows -> fetch(PDO::FETCH_ASSOC)) {
                $checkin = [
                    'id' => intval($row['id']),
                    'position' => [
                        'lt' => doubleval($row['lt']),
                        'lg' => doubleval($row['lg'])
                    ]
                ];

                array_push($response, $checkin);
            }
            break;
    }

    if (is_array($response)) {
        header('Content-type: application/json');
        header("HTTP/1.0 200 OK");
        echo json_encode($response);
    } else {
        header("HTTP/1.0 400 Bad Request");
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST' && $_SERVER['SCRIPT_NAME'] == '/check-in' && $input != '') {
    $checkin = json_decode($input, true);
    $mental_state = $checkin['mental_state'];
    include('mysql_pdo_conn.php');

    $sql = 'INSERT INTO beta_rows (lt, lg, privacy, joy, fear, determination, anger) '.
        'VALUES ('.strval($checkin['position']['lt']).
        ','.strval($checkin['position']['lg']).
        ','.strval($checkin['privacy']).
        ','.strval($mental_state['joy']).
        ','.strval($mental_state['fear']).
        ','.strval($mental_state['determination']).
        ','.strval($mental_state['anger']).')';

    if ($conn->exec($sql)) {
        $lastId = $conn->lastInsertId();

        $sql = 'SELECT r1.id, r1.lt, r1.lg, r1.privacy
                FROM beta_rows AS r1, beta_rows AS r2
                WHERE r1.id = '.$lastId.'
                AND r2.time > ADDTIME(NOW(), \'-'.$select_timespan.'\')
                AND r1.lt <= (r2.lt + 0.00015)
                AND r1.lt >= (r2.lt - 0.00015)
                AND r1.lg <= (r2.lg + 0.00015)
                AND r1.lg >= (r2.lg - 0.00015)
                GROUP BY r1.id
                HAVING COUNT(r2.id) >= r1.privacy
                LIMIT 1;';
        $rows = $conn->query($sql);
        if ($row = $rows -> fetch(PDO::FETCH_ASSOC)) {
            $checkin = [
                'id' => intval($row['id']),
                'position' => [
                    'lt' => doubleval($row['lt']),
                    'lg' => doubleval($row['lg'])
                ]
            ];

            include dirname(__FILE__) . '/realtime/config.php';

            $response = array($checkin);
            $context = new ZMQContext();
            $socket = $context->getSocket(ZMQ::SOCKET_PUSH, 'my realtime');
            $socket->connect($zmq_bind);

            $socket->send(json_encode($response));
        }

        header("HTTP/1.0 200 OK");
    } else {
        header("HTTP/1.0 400 Bad Request");
    }
}

?>