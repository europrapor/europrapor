<?php

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    switch ($_SERVER['SCRIPT_NAME']) {
        case '/maps':
            header('Content-type: application/json');
            header("HTTP/1.0 200 OK");
            echo '["joy", "fear", "determination", "anger"]';
            break;
        case '/map':
            header('Content-type: application/json');
            header("HTTP/1.0 200 OK");
            echo '[
                      {
                          "id": 1,
                          "position": {
                              "lt": 35.45645,
                              "lg": 67.987986
                          }
                      },
                      {
                          "id": 2,
                          "position": {
                              "lt": 35.45645,
                              "lg": 67.987986
                          }
                      }
                  ]';
            break;
        case '/map/0':
        case '/map/1':
        case '/map/2':
        case '/map/3':
            header('Content-type: application/json');
            header("HTTP/1.0 200 OK");
            echo '[
                      {
                          "id": 1,
                          "heat": 1
                      },
                      {
                          "id": 2,
                          "heat": 5
                      }
                  ]';
            break;
        default:
            header("HTTP/1.0 400 Bad Request");
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST' && $_SERVER['SCRIPT_NAME'] == '/check-in') {
    header("HTTP/1.0 201 Created");
}

?>