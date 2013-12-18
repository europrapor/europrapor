<?php

$maps = ['joy', 'fear', 'determination', 'anger'];
$response = '';
$input = file_get_contents('php://input');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (preg_match('/^\/map\/(\w+)$/', $_SERVER['SCRIPT_NAME'], $matches) && in_array($matches[1], $maps)) {
        include('mysql_pdo_conn.php');
        $sql = 'SELECT id, privacy, joy, fear, determination, anger FROM beta_rows';
        $rows = $conn->query($sql);
        if (!$rows) {
            echo 'An SQL error occured.\n';
            exit(1);
        }

        $response = array();
        while ($row = $rows -> fetch(PDO::FETCH_ASSOC)) {
            $heat = [
                'id' => intval($row['id']),
                'heat' => intval($row[$matches[1]])
            ];

            array_push($response, $heat);
        }
    }

    switch ($_SERVER['SCRIPT_NAME']) {
        case '/maps':
            $response = $maps;
            break;
        case '/map':
            include('mysql_pdo_conn.php');
            // 0.00015 ~ 15 meters
            $sql = 'SELECT r1.id, r1.lt, r1.lg, r1.privacy
                FROM beta_rows AS r1, beta_rows AS r2
                WHERE r1.lt <= (r2.lt + 0.00015)
                AND r1.lt >= (r2.lt - 0.00015)
                AND r1.lg <= (r2.lg + 0.00015)
                AND r1.lg >= (r2.lg - 0.00015)
                GROUP BY r1.id
                HAVING COUNT(r2.id) >= r1.privacy;';
            $rows = $conn->query($sql);
            if (!$rows) {
                echo 'An SQL error occured.\n';
                exit(1);
            }

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

    if ($response) {
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
        header("HTTP/1.0 200 OK");
    } else {
        header("HTTP/1.0 400 Bad Request");
    }
}

?>