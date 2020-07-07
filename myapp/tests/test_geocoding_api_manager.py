from unittest.mock import Mock, patch
import json
from nose.tools import assert_is_none, assert_list_equal, assert_equal
from myapp.geocoding_api_manager import GeocodingApiManager

class test_geocoding():
    def __init__(self):
        self.text_to_parse = "Salut GrandPy ! Est-ce que tu connais l'adresse OpenClassrooms ?"
        self.final_text = "OpenClassrooms"
        self.lat = 48.8748465
        self.long = 2.3504873

    def test_parser(self):
        parser = GeocodingApiManager(self.text_to_parse)
        parser.parser_killer()

        assert_equal(parser.name, self.final_text)

    def load_json_geocoding(self):
        results_gmaps = {
  "results": [
      {
         "address_components": [
            {
               "long_name": "7",
               "short_name": "7",
               "types": [
                  "street_number"
               ]
            },
            {
               "long_name": "Cité Paradis",
               "short_name": "Cité Paradis",
               "types": [
                  "route"
               ]
            },
         ],
         "formatted_address": "7 Cité Paradis, 75010 Paris, France",
         "geometry": {
            "location": {
               "lat": 48.8748465,
               "lng": 2.3504873
            },
         }
     }
  ]
}


        return results_gmaps

    def test_create_file_geocododing(self):
        new_dict = GeocodingApiManager("OpenClassrooms").create_file_geocododing(self.load_json_geocoding())

        assert_equal(new_dict['location']['lat'], self.lat)
        assert_equal(new_dict['location']['lng'], self.long)
