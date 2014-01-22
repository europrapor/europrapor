<?php
    use Ratchet\Server\IoServer;
    use Ratchet\Http\HttpServer;
    use Ratchet\WebSocket\WsServer;
    use Ws\RealTime;

    require dirname(__FILE__) . '/vendor/autoload.php';

    include dirname(__FILE__) . '/config.php';

    $realtime = new RealTime();

    $loop   = React\EventLoop\Factory::create();
    $context = new React\ZMQ\Context($loop);
    $pull = $context->getSocket(ZMQ::SOCKET_PULL);
    $pull->bind($zmq_bind); // Binding to 127.0.0.1 means the only client that can connect is itself
    $pull->on('message', array($realtime , 'onCheckIn'));

    $webSock = new React\Socket\Server($loop);
    $webSock->listen($ws_port, '0.0.0.0'); // Binding to 0.0.0.0 means remotes can connect
    $webServer = new Ratchet\Server\IoServer(
        new Ratchet\Http\HttpServer(
            new Ratchet\WebSocket\WsServer(
                $realtime
            )
        ),
        $webSock
    );

    $loop->run();
?>