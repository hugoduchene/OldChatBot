import json
import urllib.request
import settings

class MediawikiApiManager:
    """ relation with mediawiki api """

    def __init__(self):
        """ class initialization """
        self.dictionnary = {}
        self.nameArray = settings.DictName

    def load_json_content(self, titleWiki):
        """ method for loading the json with pageid """

        url = "https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exsentences=3&titles=" + titleWiki
        response = urllib.request.urlopen(url)
        data = json.loads(response.read())

        return data

    def create_file_content(self):
        nameArray = self.nameArray

        for name, titleWiki in nameArray.items():
            data = self.load_json_content(titleWiki)
            self.dictionnary[name] = data

        return self.dictionnary
