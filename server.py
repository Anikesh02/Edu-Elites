from flask import Flask, make_response, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
import firebase_admin
from firebase_admin import credentials, firestore
from chatbot import get_gpt4_Response
from GetCharts import course_progression, marks_progression
from flask import Flask, request, jsonify
import base64
from flask_cors import CORS



app = Flask(__name__)
CORS(app)


@app.route("/gpt4", methods=["POST","GET"])
def gptbot():
    message = request.data.decode("utf-8")
    response = get_gpt4_Response(message)
    return jsonify({'response': response})

@app.route("/getChart", methods=["POST","GET", "OPTIONS"])
def get_chart():
    if request.method == 'OPTIONS':
        # Respond to preflight request
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "*")
        return response
    data = request.get_json()
    chart_type = data.get('chart_type')
    
    if chart_type == 'course_progress':
        chart_path = course_progression({
        "Science": 75,
        "Maths": 12,
        "Sc. St.": 10,
        "English": 80,
        # Add more courses and progress data as needed
    })
    else:
        return jsonify({'error': 'Invalid chart type'})

    # Read the image data
    with open(chart_path, "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

    return jsonify({'image': encoded_image})

# Step 8: Run Flask App
if __name__ == '__main__':
    app.run(debug=True)
