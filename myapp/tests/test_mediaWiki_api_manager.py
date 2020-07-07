from unittest.mock import Mock, patch
import json
from nose.tools import assert_is_none, assert_list_equal, assert_equal
from myapp.mediawiki_api_manager import MediawikiApiManager

class test_mediaWiki():
    def __init__(self):
        self.initClass = MediawikiApiManager("Cité Paradis")
        self.content = "<p class=\"mw-empty-elt\">\n</p>\n<p>La <b>cité Paradis</b> est une voie publique située dans le <abbr class=\"abbr\" title=\"Dixième\">10<sup>e</sup></abbr>&#160;arrondissement de Paris.\n</p>\n\n\n<h2><span id=\"Situation_et_acc.C3.A8s\"></span><span id=\"Situation_et_accès\">Situation et accès</span></h2>\n<p>La cité Paradis est une voie publique située dans le <abbr class=\"abbr\" title=\"Dixième\">10<sup>e</sup></abbr>&#160;arrondissement de Paris. Elle est en forme de té, une branche débouche au 43, rue de Paradis, la deuxième au 57, rue d'Hauteville et la troisième en impasse.</p>"

    def load_json_content(self):
        result_contentWiki = {
            "query": {
    "pages": {
      "5653202": {
        "pageid": 5653202,
        "ns": 0,
        "title": "Cité Paradis",
        "extract": "<p class=\"mw-empty-elt\">\n</p>\n<p>La <b>cité Paradis</b> est une voie publique située dans le <abbr class=\"abbr\" title=\"Dixième\">10<sup>e</sup></abbr>&#160;arrondissement de Paris.\n</p>\n\n\n<h2><span id=\"Situation_et_acc.C3.A8s\"></span><span id=\"Situation_et_accès\">Situation et accès</span></h2>\n<p>La cité Paradis est une voie publique située dans le <abbr class=\"abbr\" title=\"Dixième\">10<sup>e</sup></abbr>&#160;arrondissement de Paris. Elle est en forme de té, une branche débouche au 43, rue de Paradis, la deuxième au 57, rue d'Hauteville et la troisième en impasse.</p>"
      }
    }
  }
}
    def test_create_file_mediaWiki(self):
        new_dict = self.initClass.create_file_content(self.load_json_content())

        assert_equal(new_dict["content"], self.content)
