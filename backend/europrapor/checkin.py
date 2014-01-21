from db import Database
from tornado.escape import json_decode
from tornado.web import RequestHandler
from settings import REALTIME_BUS_ADDR, SELECT_RADIUS, SELECT_TIMESPAN
import zmq


class CheckinHandler(RequestHandler):

    def post(self):
        checkin = json_decode(self.request.body)
        position = checkin['position']
        mental_state = checkin['mental_state']
        query = ('INSERT INTO beta_rows (lt, lg, privacy, joy, fear, determination, anger)'
                 ' VALUES ({lt}, {lg}, {privacy}, {joy}, {fear}, {determination}, {anger})'
                 .format(lt=str(position['lt']),
                         lg=str(position['lg']),
                         privacy=str(checkin['privacy']),
                         joy=str(mental_state['joy']),
                         fear=str(mental_state['fear']),
                         determination=str(mental_state['determination']),
                         anger=str(mental_state['anger'])))
        checkin_id = Database.get_connection().execute_lastrowid(query)
        query = ('SELECT r1.id, r1.lt, r1.lg, r1.privacy'
                 ' FROM beta_rows AS r1, beta_rows AS r2'
                 ' WHERE r1.id = \'{id}\''
                 '  AND r2.time > ADDTIME(NOW(), \'-{select_timespan}\')'
                 '  AND r1.lt <= (r2.lt + {select_radius})'
                 '  AND r1.lt >= (r2.lt - {select_radius})'
                 '  AND r1.lg <= (r2.lg + {select_radius})'
                 '  AND r1.lg >= (r2.lg - {select_radius})'
                 ' GROUP BY r1.id'
                 ' HAVING COUNT(r2.id) >= r1.privacy LIMIT 1'
                 .format(id=str(checkin_id), select_timespan=SELECT_TIMESPAN, select_radius=SELECT_RADIUS))
        checkin = Database.get_connection().query(query)
        if len(checkin) > 0:
            checkin = checkin[0]
            my_realtime = {
                'id': int(checkin['id']),
                'position': {
                    'lt': float(checkin['lt']),
                    'lg': float(checkin['lg'])
                }
            }
            context = zmq.Context()
            socket = context.socket(zmq.PUSH)
            socket.connect(REALTIME_BUS_ADDR)
            socket.send_json(my_realtime)
