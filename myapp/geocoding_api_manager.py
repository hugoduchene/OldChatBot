import json
import urllib.request

class GeocodingApiManager:
    """ relation with geocoding api """

    def __init__(self):
        """ class initialization """
        self.dictionnary = {}
        self.apiKey = "AIzaSyAC-uJA9vLh5Ne0mipvEAn157p1y_gVHPU"
        self.arrayPlace = {"openclassroom": "7%20CITE%20DE%20PARADIS", "palais royal": "Rue%20Brederode,%2016%201000%20Bruxelles"}

    def load_json(self, address, name):
        """ method for loading the json """

        url = "https://maps.googleapis.com/maps/api/geocode/json?address="+ address + "&key=" + self.apiKey
        response = urllib.request.urlopen(url)
        data = json.loads(response.read())
        self.dictionnary = data
        self.dictionnary["name"] = name

        return self.dictionnary

    def create_file(self):
        """ method for create the json with all informations """
        arrayPlace = self.arrayPlace
        for name, address in arrayPlace.items():
            a = self.load_json(address, name)
