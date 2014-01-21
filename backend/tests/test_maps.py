from requests import get
from tornado.escape import json_decode
import unittest


class TestMaps(unittest.TestCase):

    def test_maps(self):
        response = get('http://localhost:8000/maps')
        self.assertEqual(json_decode(response.text),
                         [{'map_id': 'anger'}, {'map_id': 'determination'},
                          {'map_id': 'fear'}, {'map_id': 'joy'}])

    def test_map(self):
        response = get('http://localhost:8000/map')
        self.assertEqual(json_decode(response.text), [])

    def test_anger_map(self):
        response = get('http://localhost:8000/map/anger')
        self.assertEqual(json_decode(response.text), [])

    def test_determination_map(self):
        response = get('http://localhost:8000/map/determination')
        self.assertEqual(json_decode(response.text), [])

    def test_fear_map(self):
        response = get('http://localhost:8000/map/fear')
        self.assertEqual(json_decode(response.text), [])

    def test_joy_map(self):
        response = get('http://localhost:8000/map/joy')
        self.assertEqual(json_decode(response.text), [])


if __name__ == '__main__':
    unittest.main()
