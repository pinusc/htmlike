from flask import Flask
from flask import render_template, url_for
app = Flask(__name__)


@app.route("/")
def hello():
    print(url_for('static', filename='style.css'))
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
