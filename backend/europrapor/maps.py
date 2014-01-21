from db import Database
from settings import SELECT_RADIUS, SELECT_TIMESPAN
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
            checkins = []
            query = ('SELECT r1.id, r1.lt, r1.lg, r1.privacy'
                     ' FROM beta_rows AS r1, beta_rows AS r2'
                     ' WHERE r1.time > ADDTIME(NOW(), \'-{select_timespan}\')'
                     '  AND r2.time > ADDTIME(NOW(), \'-{select_timespan}\')'
                     '  AND r1.lt <= (r2.lt + {select_radius})'
                     '  AND r1.lt >= (r2.lt - {select_radius})'
                     '  AND r1.lg <= (r2.lg + {select_radius})'
                     '  AND r1.lg >= (r2.lg - {select_radius})'
                     ' GROUP BY r1.id'
                     ' HAVING COUNT(r2.id) >= r1.privacy'
                     .format(select_timespan=SELECT_TIMESPAN, select_radius=SELECT_RADIUS))
            for r in Database.get_connection().query(query):
                checkin = {
                    'id': int(r['id']),
                    'position': {
                        'lt': float(r['lt']),
                        'lg': float(r['lg'])
                    }
                }
                checkins.append(checkin)
            self.write(json_encode(checkins))


class EmotionalMapHandler(RequestHandler):

    def get(self):
        heat_map = []
        query = ('SELECT id, {emotion} FROM beta_rows'
                 ' WHERE time > ADDTIME(NOW(), \'-{select_timespan}\')'
                 .format(emotion=self.__class__.emotion, select_timespan=SELECT_TIMESPAN))
        for r in Database.get_connection().query(query):
            heat = {
                'id': int(r['id']),
                'heat': int(r.get(self.__class__.emotion))
            }
            heat_map.append(heat)
        self.write(json_encode(heat_map))


class AngerMapHandler(EmotionalMapHandler):

    emotion = 'anger'


class DeterminationMapHandler(EmotionalMapHandler):

    emotion = 'determination'


class FearMapHandler(EmotionalMapHandler):

    emotion = 'fear'


class JoyMapHandler(EmotionalMapHandler):

    emotion = 'joy'
