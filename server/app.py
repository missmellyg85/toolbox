import os
from flask import Flask, jsonify, url_for, json
from flask_cors import CORS

DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)

CORS(app, resources={r'/*': {'origins': '*'}})


@app.route('/ping', methods=['GET'])
def ping_check():
    return jsonify('It works!')


@app.route('/patterns', methods=['GET'])
def patterns():
    filename = os.path.join(app.static_folder, 'data.json')
    with open(filename) as blog_file:
        data = json.load(blog_file)
    return jsonify(data)


if __name__ == '__main__':
    app.run()
