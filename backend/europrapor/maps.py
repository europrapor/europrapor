from tornado.escape import json_encode
from tornado.web import RequestHandler


class MapsHandler(RequestHandler):

    def get(self):
        if self.request.uri == '/maps':
            maps = [{'map_id': 'anger'},
                    {'map_id': 'determination'},
                    {'map_id': 'fear'},
                    {'map_id': 'joy'}]
            self.write(json_encode(maps))
        else:
            self.write(json_encode([]))


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
