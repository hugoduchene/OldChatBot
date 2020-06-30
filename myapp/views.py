from flask import Flask, request, jsonify
from flask import render_template
from geocoding_api_manager import GeocodingApiManager
from mediawiki_api_manager import MediawikiApiManager
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


geocode_api = GeocodingApiManager()
mediawiki_api = MediawikiApiManager()

@app.route('/api/content/geocoding')
def display_api_geocoding():
    return jsonify(geocode_api.create_file_geocododing())

@app.route('/api/content/description')
def display_api_content():
    return jsonify(mediawiki_api.create_file_content())

@app.route('/index')
def display_index():
    return render_template("index.html")



if __name__ == "__main__":
    app.run(debug=False)
