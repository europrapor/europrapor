import logging
from tornado.web import RequestHandler


class CheckinHandler(RequestHandler):

    def post(self):
        logging.debug("Accepted!")
