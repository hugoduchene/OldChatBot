from flask import Flask, request
from flask import render_template
app = Flask(__name__)

@app.route('/test/<name>')
def hello_world(name=None):
    return render_template("test.html", name=name)

@app.route('/tests/form')
def wesh():
    return render_template("wesh.html")

@app.route('/form', methods=['GET', 'POST'])
def test_form(data=None):

    if request.method == 'POST':
        data = request.form['prenom']
        a = render_template("test1.html", data = data)
        return render_template("wesh.html")
    return render_template("test1.html")



if __name__ == "__main__":
    app.run(debug=False)
