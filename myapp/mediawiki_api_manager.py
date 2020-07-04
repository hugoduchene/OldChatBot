import json
import urllib.request


class MediawikiApiManager:
    """ relation with mediawiki api """

    def __init__(self, titleWiki):
        """ class initialization """
        self.dictionnary = {}
        self.titleWiki = titleWiki
        self.character = ""

    def load_json_content(self):
        """ method for loading the json with pageid """

        good_title = urllib.parse.quote(self.titleWiki)
        url = "https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exsentences=3&titles=" + good_title

        response = urllib.request.urlopen(url)
        data = json.loads(response.read())

        return data

    def create_file_content(self):
        dict = self.load_json_content()

        pageId = dict.get("query").get("pages")
        for nbs_id in pageId:
            nbs_id = str(nbs_id)

        content = dict.get("query").get("pages").get(nbs_id).get("extract")
        self.dictionnary["content"] = content

        return self.dictionnary
