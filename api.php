<?php

$maps = ['joy', 'fear', 'determination', 'anger'];
$response = '';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (preg_match('/^\/map\/(\w+)$/', $_SERVER['SCRIPT_NAME'], $matches) && in_array($matches[1], $maps)) {
        include('mysql_pdo_conn.php');
        $sql = 'SELECT id, unixtime, rep1 AS coords, rep2 AS security, rep3 AS joy, rep4 AS fear, rep5 AS determination, divers AS anger FROM alpha_rows';
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
            $sql = 'SELECT id, unixtime, rep1 AS coords, rep2 AS security, rep3 AS joy, rep4 AS fear, rep5 AS determination, divers AS anger FROM alpha_rows';
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
        exit();
    } else {
        header("HTTP/1.0 400 Bad Request");
        exit();
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST' && $_SERVER['SCRIPT_NAME'] == '/check-in') {
    var_dump(file_get_contents('php://input'));
    header("HTTP/1.0 201 Created");
}

?>