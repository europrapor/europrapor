<?php

$maps = ['joy', 'fear', 'determination', 'anger'];
$response = '';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (preg_match('/^\/map\/(\w+)$/', $_SERVER['SCRIPT_NAME'], $matches) && in_array($matches[1], $maps)) {
        include('mysql_pdo_conn.php');
        $sql = 'SELECT id, unixtime, rep1 AS coords, rep2 AS privacy, rep3 AS joy, rep4 AS fear, rep5 AS determination, divers AS anger FROM alpha_rows';
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
            $sql = 'SELECT id, unixtime, rep1 AS coords, rep2 AS privacy, rep3 AS joy, rep4 AS fear, rep5 AS determination, divers AS anger FROM alpha_rows';
            $rows = $conn->query($sql);
            if (!$rows) {
                echo 'An SQL error occured.\n';
                exit(1);
            }

            $response = array();
            while ($row = $rows -> fetch(PDO::FETCH_ASSOC)) {
                $latlon = split('&', str_replace(['lon=', 'lat='], '', $row['coords']));
                $lt = $latlon[0];
                $lg = $latlon[1];

                $checkin = [
                    'id' => intval($row['id']),
                    'position' => [
                        'lt' => $lt,
                        'lg' => $lg
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
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST' && $_SERVER['SCRIPT_NAME'] == '/check-in' && isset($_POST['check-in'])) {
    $checkin = json_decode($_POST['check-in'], true);
    $mental_state = $checkin['mental_state'];
    include('mysql_pdo_conn.php');

    $datetime = new DateTime('NOW', new DateTimeZone('UTC'));
    $sql = 'INSERT INTO alpha_rows (time, unixtime, rep1, rep2, rep3, rep4, rep5, divers) '.
        'VALUES ("'.date('Y-m-d h:i:s').'",'.$datetime->format('U').',"lat='.
        strval($checkin['position']['lt']).'&lon='.strval($checkin['position']['lg']).'",'.strval($checkin['privacy']).','.
        strval($mental_state['joy']).','.strval($mental_state['fear']).','.strval($mental_state['determination']).','.strval($mental_state['anger']).')';

    if ($conn->exec($sql)) {
        header("HTTP/1.0 201 Created");
    } else {
        header("HTTP/1.0 400 Bad Request");
    }
}

?>