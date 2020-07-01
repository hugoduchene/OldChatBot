from .geocoding_api_manager import GeocodingApiManager
import urllib.request
from io import BytesIO
import json

api_geocode = GeocodingApiManager()

def test_http_result(monkeypatch):
    result = ""

    def mocketreturn(request):
        return BytesIO(json.dumps(result).encode())
    monkeypatch.setattr(urllib.request, 'urlopen', mocketreturn)

    assert api_geocode.load_json_geocoding("", "oc") == {"oc" : result}
