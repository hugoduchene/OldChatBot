from flask import Flask, request
from flask import render_template
app = Flask(__name__)

@app.route('/test/<name>')
def hello_world(name=None):
    return render_template("test.html", name=name)




if __name__ == "__main__":
    app.run(debug=False)
