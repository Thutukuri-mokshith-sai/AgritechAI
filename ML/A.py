import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import pickle
import os

# List of .xlsx files
files = [
    "bajra.xlsx", "barley.xlsx", "black gram.xlsx", "chilli red.xlsx", "copra.xlsx", 
    "gram_raw.xlsx", "green gram.xlsx", "groundnut.xlsx", "jowar.xlsx", "lentil.xlsx", 
    "maize.xlsx", "mustard.xlsx", "niger seed.xlsx", "onion.xlsx", "paddy.xlsx", 
    "pegeonn pea.xlsx", "potato.xlsx", "ragi.xlsx", "safflower.xlsx", "sesamum.xlsx", 
    "soyabean.xlsx", "sugarcane.xlsx", "sunflower.xlsx", "tomato.xlsx", "wheat1.xlsx"
]

# Directory for saving models and label encoders
model_dir = "models"
os.makedirs(model_dir, exist_ok=True)

# Iterate over each file
for file in files:
    try:
        # Load the dataset
        df = pd.read_excel(file)
        print(f"Processing file: {file}")

        # Preprocessing
        df['Price Date'] = pd.to_datetime(df['Price Date'])
        df['Day'] = df['Price Date'].dt.day
        df['Month'] = df['Price Date'].dt.month
        df['Year'] = df['Price Date'].dt.year

        # Encode categorical features
        label_encoders = {}
        for col in ['District Name', 'Commodity', 'Market Name']:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col])
            label_encoders[col] = le

        # Ensure Min Price < Max Price
        df = df[df['Min Price (Rs./Quintal)'] <= df['Max Price (Rs./Quintal)']]

        # Optimize the data types to reduce memory usage
        df['Min Price (Rs./Quintal)'] = df['Min Price (Rs./Quintal)'].astype('float32')
        df['Max Price (Rs./Quintal)'] = df['Max Price (Rs./Quintal)'].astype('float32')
        df['Modal Price (Rs./Quintal)'] = df['Modal Price (Rs./Quintal)'].astype('float32')
        df['District Name'] = df['District Name'].astype('category')
        df['Commodity'] = df['Commodity'].astype('category')
        df['Market Name'] = df['Market Name'].astype('category')

        # Define features and target variables
        X = df[['District Name', 'Commodity', 'Market Name', 'Day', 'Month', 'Year']]
        y_min = df['Min Price (Rs./Quintal)']
        y_max = df['Max Price (Rs./Quintal)']
        y_modal = df['Modal Price (Rs./Quintal)']

        # Split data into training and testing sets
        X_train, X_test, y_min_train, y_min_test = train_test_split(X, y_min, test_size=0.2, random_state=42)
        _, _, y_max_train, y_max_test = train_test_split(X, y_max, test_size=0.2, random_state=42)
        _, _, y_modal_train, y_modal_test = train_test_split(X, y_modal, test_size=0.2, random_state=42)

        # Train Random Forest models with optimizations (fewer trees, max depth limit)
        min_price_model = RandomForestRegressor(n_estimators=50, max_depth=10, max_features='sqrt', random_state=42)
        max_price_model = RandomForestRegressor(n_estimators=50, max_depth=10, max_features='sqrt', random_state=42)
        modal_price_model = RandomForestRegressor(n_estimators=50, max_depth=10, max_features='sqrt', random_state=42)

        min_price_model.fit(X_train, y_min_train)
        max_price_model.fit(X_train, y_max_train)
        modal_price_model.fit(X_train, y_modal_train)

        # Save models and label encoders to .pkl files
        base_name = os.path.splitext(file)[0]  # Extract the base name from the file name

        # Save the models
        with open(os.path.join(model_dir, f"{base_name}_min_price_model.pkl"), 'wb') as f:
            pickle.dump(min_price_model, f)
        with open(os.path.join(model_dir, f"{base_name}_max_price_model.pkl"), 'wb') as f: 
            pickle.dump(max_price_model, f)
        with open(os.path.join(model_dir, f"{base_name}_modal_price_model.pkl"), 'wb') as f:
            pickle.dump(modal_price_model, f)

        # Save the label encoders
        with open(os.path.join(model_dir, f"{base_name}_label_encoders.pkl"), 'wb') as f:
            pickle.dump(label_encoders, f)

        print(f"Models and label encoders saved for {file}")

    except Exception as e:
        print(f"Error processing file {file}: {e}")
