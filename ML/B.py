from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS
import os
from datetime import datetime, timedelta
import requests
app = Flask(__name__)
# Enable CORS for the Flask app
CORS(app)
# Mapping of commodity names to corresponding model base names
commodity_to_file_base = {
    "Bajra(Pearl Millet/Cumbu)": "bajra",
    "Barley (Jau)": "barley",
    "Black Gram (Urd Beans)(Whole)": "black gram",
    "Chili Red": "chilli red",
    "Copra": "copra",
    "Gram Raw(Chholia)": "gram_raw",
    "Green Gram (Moong)(Whole)": "green gram",
    "Groundnut": "groundnut",
    "Jowar(Sorghum)": "jowar",
    "Lentil (Masur)(Whole)": "lentil",
    "Maize": "maize",
    "Mustard": "mustard",
    "Niger Seed (Ramtil)": "niger seed",
    "Onion": "onion",
    "Paddy(Dhan)(Common)": "paddy",
    "Pegeon Pea (Arhar Fali)": "pegeon pea",
    "Potato": "potato",
    "Ragi (Finger Millet)": "ragi",
    "Safflower": "safflower",
    "Sesamum(Sesame,Gingelly,Til)": "sesamum",
    "Soyabean": "soyabean",
    "Sugarcane": "sugarcane",
    "Sunflower": "sunflower",
    "Tomato": "tomato",
    "Wheat": "wheat1"
}

# Directory for models
model_dir = "models"

# Load the models and label encoders
def load_model_and_encoders(file_name):
    try:
        # Paths for the .pkl files
        min_price_model_path = os.path.join(model_dir, f"{file_name}_min_price_model.pkl")
        max_price_model_path = os.path.join(model_dir, f"{file_name}_max_price_model.pkl")
        modal_price_model_path = os.path.join(model_dir, f"{file_name}_modal_price_model.pkl")
        label_encoders_path = os.path.join(model_dir, f"{file_name}_label_encoders.pkl")

        # Check if all model files exist
        for path in [min_price_model_path, max_price_model_path, modal_price_model_path, label_encoders_path]:
            if not os.path.exists(path):
                print(f"Error: Model or encoder file not found at {path}")
                return None, None, None, None

        # Load the models
        with open(min_price_model_path, 'rb') as f:
            min_price_model = pickle.load(f)
        with open(max_price_model_path, 'rb') as f:
            max_price_model = pickle.load(f)
        with open(modal_price_model_path, 'rb') as f:
            modal_price_model = pickle.load(f)

        # Load the label encoders
        with open(label_encoders_path, 'rb') as f:
            label_encoders = pickle.load(f)

        return min_price_model, max_price_model, modal_price_model, label_encoders
    except Exception as e:
        print(f"Error loading models and encoders: {e}")
        return None, None, None, None

# Function to encode input with unknown label handling
def encode_with_unknown(le, value):
    try:
        return le.transform([value])[0]
    except ValueError:
        return -1  # Assign -1 or some placeholder value for unseen labels

# Helper function to generate dates in a range
def generate_date_range(from_date, to_date):
    start_date = datetime.strptime(from_date, "%Y-%m-%d")
    end_date = datetime.strptime(to_date, "%Y-%m-%d")
    delta = end_date - start_date
    return [(start_date + timedelta(days=i)).date() for i in range(delta.days + 1)]

@app.route('/predict', methods=['POST'])
def predict_prices():
    try:
        data = request.get_json()
        print("Received data:", data)

        # Extract input fields
        commodity = data.get('commodity')
        district = data.get('district')
        market_name = data.get('market_name')
        start_date = data.get('start_date')
        end_date = data.get('end_date')

        # Validate inputs
        if not all([commodity, district, market_name, start_date, end_date]):
            return jsonify({"error": "Missing required fields in the request."}), 400

        # Map commodity to file base
        file_base = commodity_to_file_base.get(commodity)
        if not file_base:
            print("Error: Commodity mapping not found for", commodity)
            return jsonify({"error": f"Commodity '{commodity}' not found in mapping."}), 400

        # Load models and encoders
        min_price_model, max_price_model, modal_price_model, label_encoders = load_model_and_encoders(file_base)
        if not all([min_price_model, max_price_model, modal_price_model, label_encoders]):
            return jsonify({"error": "Error loading models or encoders."}), 500

        # Generate the date range
        date_range = generate_date_range(start_date, end_date)

        results = []
        for single_date in date_range:
            # Extract the date components
            day = single_date.day
            month = single_date.month
            year = single_date.year

            # Encode input data
            encoded_data = {
                'District Name': encode_with_unknown(label_encoders['District Name'], district),
                'Commodity': encode_with_unknown(label_encoders['Commodity'], commodity),
                'Market Name': encode_with_unknown(label_encoders['Market Name'], market_name),
                'Day': day,
                'Month': month,
                'Year': year,
            }
            print("Encoded data for", single_date, ":", encoded_data)

            X_input = np.array([list(encoded_data.values())]).reshape(1, -1)

            # Make predictions
            min_price_pred = min_price_model.predict(X_input)
            max_price_pred = max_price_model.predict(X_input)
            modal_price_pred = modal_price_model.predict(X_input)

            result = {
                "Date": single_date.strftime("%Y-%m-%d"),
                "Min Price": min_price_pred[0],
                "Max Price": max_price_pred[0],
                "Modal Price": modal_price_pred[0]
            }
            results.append(result)

        print("Prediction results:", results)

        return jsonify(results)

    except Exception as e:
        print("Error during prediction:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route('/getweatherdata', methods=['POST'])
def get_weather_data():
    try:
        data = request.get_json()
        location = data.get('location')

        if not location:
            return jsonify({"error": "Location is required."}), 400

        # Coordinates for the location (you may need to use a geocoding service to get latitude and longitude)
        latitude, longitude = 13.7424, 78.6878  # Example coordinates (adjust this as necessary)

        # Fetch weather data from Tomorrow.io API
        API_KEY = "rE5GTexUUHydzzoGGwpFWcAgDEnQKUSO"
        BASE_URL = "https://api.tomorrow.io/v4/timelines"
        
        params = {
            'location': f'{latitude},{longitude}',
            'apikey': API_KEY,
            'timesteps': '1d',
            'fields': ['temperature', 'precipitationIntensity', 'windSpeed', 'humidity'],
        }

        response = requests.get(BASE_URL, params=params)

        # Log the full API response for debugging
        print("Full API response:", response.json())

        if response.status_code == 200:
            data = response.json()
            timelines = data.get('timelines', {}).get('daily', [])
            
            weather_data = []
            for entry in timelines:
                values = entry.get('values', {})
                filtered_entry = {key: value for key, value in values.items() if value != 0 and value is not None}
                weather_data.append({'time': entry.get('time'), 'values': filtered_entry})

            print("Weather data for location:", location, weather_data)
            return jsonify({"weather_forecast": weather_data})

        else:
            return jsonify({"error": "Failed to retrieve weather data from Tomorrow.io"}), 500

    except Exception as e:
        print("Error during weather data retrieval:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
