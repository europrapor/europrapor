from tornado.escape import json_encode
from requests import post
import unittest


class TestCheckin(unittest.TestCase):

    def test_checkin(self):
        data = {
            'position': {
                'lt': 35.45645,
                'lg': 67.98798
            },
            'mental_state': {
                'joy': 2,
                'determination': 3,
                'anger': 1,
                'fear': 0
            },
            'privacy': 10
        }
        response = post('http://localhost:8000/check-in', data=json_encode(data))
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
