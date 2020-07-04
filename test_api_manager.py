from myapp.geocoding_api_manager import GeocodingApiManager
from myapp.mediawiki_api_manager import MediawikiApiManager
import urllib.request
from io import BytesIO
import json

api_geocode = GeocodingApiManager("OpenClassrooms")
mediawiki_api = MediawikiApiManager("OpenClassrooms")

def test_http_result(monkeypatch):
    "test api_geocoding"
    result = {"results" : [""] }

    def mocketreturn(request):
        return BytesIO(json.dumps(result).encode())
    monkeypatch.setattr(urllib.request, 'urlopen', mocketreturn)


    assert api_geocode.load_json_geocoding() is not None

def test_http_result_mediaWiki(monkeypatch):
    "test api_mediaWiki"
    result = ""

    def mocketreturn(request):
        return BytesIO(json.dumps(result).encode())
    monkeypatch.setattr(urllib.request, 'urlopen', mocketreturn)


    assert mediawiki_api.load_json_content() is not None
