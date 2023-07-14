import os
import sys
import numpy as np
from flask import Flask, render_template, request, jsonify, redirect, session
from flask_cors import CORS
from flask_session import Session
from werkzeug.utils import secure_filename
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from PIL import Image, ImageFile
import my_tf_mod
from io import BytesIO
import matplotlib.pyplot as plt
import base64


app = Flask(__name__)
# CORS(app,  resources={r"/api/*": {"origins": ["http://localhost:5173", "https://more-omega.vercel.app"]}})
CORS(app,  resources={r"/api/*": {"origins": "*"}})

app.config['SESSION_TYPE'] = 'filesystem'
app.secret_key = 'super secret key'
# app.register_error_handler(400, handle_bad_request)
Session(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/Prediction', methods=['GET','POST'])
def pred():
    if request.method=='POST':
         file = request.files['file']
         org_img, img= my_tf_mod.preprocess(file)
         print(img.shape)
         fruit_dict=my_tf_mod.classify_fruit(img)
         rotten=my_tf_mod.check_rotten(img)
         img_x=BytesIO()
         plt.imshow(org_img/255.0)
         plt.savefig(img_x,format='png')
         plt.close()
         img_x.seek(0)
         plot_url=base64.b64encode(img_x.getvalue()).decode('utf8')
    return render_template('Pred3.html', fruit_dict=fruit_dict, rotten=rotten, plot_url=plot_url)


@app.route('/api/classify-fruit', methods=['POST'])
def classify_fruit():
    print(request.files)
    try:
        if 'imageFile' not in request.files:
            return jsonify({"error":"No file part"})
        img_file = request.files['imageFile']
        org_img, img = my_tf_mod.preprocess(img_file)
        fruit_dict=my_tf_mod.classify_fruit(img)
        response = jsonify({"data": fruit_dict})
        # response.headers.add('Access-Control-Allow-Origin', ["http://localhost:5173", "https://more-omega.vercel.app"])
        # response.headers.add('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')
        # response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH')
        return response
    except:
        return 'bad request!', 400

@app.route('/api/grade-fruit', methods=['POST'])
def grade_fruit():
    try:
        if 'imageFile' not in request.files:
            return jsonify({"error":"No file part"})
        img_file = request.files['imageFile']
        org_img, img= my_tf_mod.preprocess(img_file)
        rotten=my_tf_mod.check_rotten(img)
        response = jsonify({"data": rotten})
        return response
    except:
        return 'bad request!', 400

if __name__=='__main__':
    app.run(debug=True, host='172.20.0.1')
