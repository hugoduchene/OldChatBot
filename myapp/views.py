from flask import Flask, request, jsonify
from flask import render_template
from .geocoding_api_manager import GeocodingApiManager
from .mediawiki_api_manager import MediawikiApiManager
from flask_cors import CORS

app = Flask(__name__)
CORS(app)




@app.route('/')
def display_index():
    """ show the index of the chatBot """
    return render_template("index.html")

@app.route('/api/content/geocoding', methods=['POST'])
def display_api_geocoding():
    """ show api with geocoding stats """
    if request.method == 'POST':
        msg = request.form.get('message')
        geocode_api = GeocodingApiManager(msg)
        geocode_api.parser_killer()
        dict_geocoding = geocode_api.create_file_geocododing()
        return jsonify(dict_geocoding)

@app.route('/api/content/description', methods=['POST'])
def display_api_content():
    """ show api with a content wikipédia """
    if request.method == 'POST':
        msg = request.form.get('message')
        geocode_api = GeocodingApiManager(msg)
        geocode_api.parser_killer()
        dict_geocoding = geocode_api.create_file_geocododing()
        lg_name = dict_geocoding.get("long_name")
        mediawiki_api = MediawikiApiManager(lg_name)
        return jsonify(mediawiki_api.create_file_content())
