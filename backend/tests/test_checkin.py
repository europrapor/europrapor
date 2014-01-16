from tornado.escape import json_encode
from requests import post
import unittest


class TestCheckin(unittest.TestCase):

    def test_checkin(self):
        response = post('http://localhost:8000/check-in', data=json_encode({'key': 'value'}))
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
