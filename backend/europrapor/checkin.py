from db import Database
from tornado.escape import json_decode
from tornado.web import RequestHandler


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
        Database.get_connection().execute(query)
