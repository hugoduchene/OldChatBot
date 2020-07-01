import json
import urllib.request
from .settings import DictPlace

class GeocodingApiManager:
    """ relation with geocoding api """

    def __init__(self):
        """ class initialization """
        self.dictionnary = {}
        self.apiKey = "AIzaSyAC-uJA9vLh5Ne0mipvEAn157p1y_gVHPU"
        self.arrayPlace = DictPlace

    def load_json_geocoding(self, address, name):
        """ method for loading the json """

        url = "https://maps.googleapis.com/maps/api/geocode/json?address="+ address + "&key=" + self.apiKey
        response = urllib.request.urlopen(url)
        data = json.loads(response.read())
        self.dictionnary[name] = data

        return self.dictionnary

    def create_file_geocododing(self):
        """ method for create the json with all informations """
        arrayPlace = self.arrayPlace
        for name, address in arrayPlace.items():
            file_geocoding = self.load_json_geocoding(address, name)
        json.dumps(self.dictionnary)
        return self.dictionnary

a = GeocodingApiManager()
a.create_file_geocododing()
