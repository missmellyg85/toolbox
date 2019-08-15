import os
import sys
from flask import Flask, jsonify, url_for, json, request
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
    with open(filename) as pattern_data:
        data = json.load(pattern_data)
    pattern_data.close()
    return jsonify(data)

# TODO: time to start looking at Models and how to validate
# @app.route('/patterns',  methods=['POST'])
# def addPattern():
#     response_object = {'status': 'success'}
#     post_data = request.get_json()

#     new_pattern = {
#         "title": "Missy's Fancy Tee",
#         "brand": "Missy",
#         "format": "A0",
#         "printed": "Y",
#         "staged for print": "",
#         "sizes traced": "",
#         "file": "abbMen",
#         "tags": ["men", "missy"]
#     }

#     filename = os.path.join(app.static_folder, 'data.json')

#     with open(filename) as pattern_data:
#         global data
#         data = json.load(pattern_data)
#     pattern_data.close()

#     with open(filename, 'w') as pattern_data:

#         data.append(new_pattern)
#         json.dump(data, pattern_data, indent=4)

#     pattern_data.close()

#     response_object['message'] = 'A pattern was received!'
#     return jsonify(response_object)

# validatePattern():
        

if __name__ == '__main__':
    app.run()
