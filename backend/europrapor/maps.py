from tornado.escape import json_encode
from tornado.web import RequestHandler


class MapsHandler(RequestHandler):

    def get(self):
        self.write(json_encode([{'map_id': 'anger'},
                                {'map_id': 'determination'},
                                {'map_id': 'fear'},
                                {'map_id': 'joy'}]))


class AngerMapHandler(RequestHandler):

    def get(self):
        self.write(json_encode([]))


class DeterminationMapHandler(RequestHandler):

    def get(self):
        self.write(json_encode([]))


class FearMapHandler(RequestHandler):

    def get(self):
        self.write(json_encode([]))


class JoyMapHandler(RequestHandler):

    def get(self):
        self.write(json_encode([]))
