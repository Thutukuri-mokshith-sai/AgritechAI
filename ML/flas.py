import os
import pickle
import pandas as pd
from flask import Flask, request, jsonify, render_template
from datetime import datetime

app = Flask(__name__)

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
    "Pegeon Pea (Arhar Fali)": "pegeonn pea",
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

MODEL_DIR = "models"  # Directory where your models are saved

def predict_prices(commodity_name, input_data):
    try:
        if commodity_name not in commodity_to_file_base:
            raise ValueError(f"Commodity '{commodity_name}' is not recognized.")
        
        file_base_name = commodity_to_file_base[commodity_name]

        min_price_model_path = os.path.join(MODEL_DIR, f"{file_base_name}_min_price_model.pkl")
        max_price_model_path = os.path.join(MODEL_DIR, f"{file_base_name}_max_price_model.pkl")
        modal_price_model_path = os.path.join(MODEL_DIR, f"{file_base_name}_modal_price_model.pkl")

        if not all(os.path.exists(path) for path in [min_price_model_path, max_price_model_path, modal_price_model_path]):
            raise FileNotFoundError(f"Models for {commodity_name} not found in {MODEL_DIR}.")

        with open(min_price_model_path, 'rb') as f:
            min_price_model = pickle.load(f)
        with open(max_price_model_path, 'rb') as f:
            max_price_model = pickle.load(f)
        with open(modal_price_model_path, 'rb') as f:
            modal_price_model = pickle.load(f)

        df = pd.DataFrame([input_data])
        df['Price Date'] = pd.to_datetime(df['Price Date'])
        df['Day'] = df['Price Date'].dt.day
        df['Month'] = df['Price Date'].dt.month
        df['Year'] = df['Price Date'].dt.year

        # Encoding categorical variables
        for col in ['District Name', 'Commodity', 'Market Name']:
            encoder_path = os.path.join(MODEL_DIR, f"{file_base_name}_{col}_encoder.pkl")
            if os.path.exists(encoder_path):
                with open(encoder_path, 'rb') as f:
                    le = pickle.load(f)
                df[col] = le.transform(df[col])

        X = df[['District Name', 'Commodity', 'Market Name', 'Day', 'Month', 'Year']]

        min_price = min_price_model.predict(X)[0]
        max_price = max_price_model.predict(X)[0]
        modal_price = modal_price_model.predict(X)[0]

        return {
            "Min Price (Rs./Quintal)": min_price,
            "Max Price (Rs./Quintal)": max_price,
            "Modal Price (Rs./Quintal)": modal_price
        }

    except Exception as e:
        raise RuntimeError(f"Error in predicting prices: {e}")

@app.route('/predict', methods=['POST'])
def api_predict():
    try:
        data = request.json

        required_fields = ["Commodity", "District Name", "Price Date", "Market Name"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        commodity_name = data['Commodity']
        predictions = predict_prices(commodity_name, data)

        return jsonify(predictions)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
