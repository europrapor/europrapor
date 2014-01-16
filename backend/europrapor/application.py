from checkin import CheckinHandler
import logging
from maps import MapsHandler, AngerMapHandler, DeterminationMapHandler, FearMapHandler, JoyMapHandler
from settings import DEBUG_MODE, HTTP_ADDR, HTTP_PORT, HTTP_WORKERS
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.web import Application


def main():
    if DEBUG_MODE:
        logging.basicConfig(level=logging.DEBUG, format='%(message)s')

    routes = (
        (r'/check-in', CheckinHandler),
        (r'/maps', MapsHandler),
        (r'/map/anger', AngerMapHandler),
        (r'/map/determination', DeterminationMapHandler),
        (r'/map/fear', FearMapHandler),
        (r'/map/joy', JoyMapHandler),
    )

    application = Application(routes)
    server = HTTPServer(application)
    server.bind(HTTP_PORT, HTTP_ADDR)
    server.start(HTTP_WORKERS)

    try:
        IOLoop.instance().start()
    except KeyboardInterrupt:
        IOLoop.instance().stop()


if __name__ == '__main__':
    main()
