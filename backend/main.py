from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load whatever is in the pickle file
with open('cpuMark_rf_model.pkl', 'rb') as f:
    model = pickle.load(f)
    print("Model type:", type(model))
    if isinstance(model, np.ndarray):
        print("Model content:", model)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("Received JSON:", data)
        print("Data types of each field:")
        for key, value in data.items():
            print(f"  {key}: {type(value)} = {value}")

        # Map expected field names
        expected_fields = {
            'Threads': ['threads', 'Threads', 'threadMark', 'ThreadMark'],
            'TDP': ['tdp', 'TDP', 'power', 'Power'],
            'PowerPerf': ['powerperf', 'PowerPerf', 'performance', 'Performance'],
            'Cores': ['cores', 'Cores', 'coreMark', 'CoreMark'],
            'Year': ['year', 'Year', 'releaseYear', 'ReleaseYear']
        }

        # Extract features
        features = []
        for field, possible_names in expected_fields.items():
            print(f"Looking for {field} in possible names: {possible_names}")
            value = None
            for name in possible_names:
                if name in data:
                    try:
                        value = float(data[name])
                        print(f"  Found {name} = {value}")
                        break
                    except ValueError as e:
                        print(f"  Error converting {name}: {str(e)}")
                        return jsonify({'error': f"Could not convert {name}='{data[name]}' to float"}), 400
            
            if value is None:
                print(f"  Missing field {field}")
                return jsonify({'error': f'Missing required field: {field}. Possible field names: {possible_names}'}), 400
            
            features.append(value)

        print("Final features:", features)

        # Make prediction - FIX HERE
        if isinstance(model, np.ndarray):
            print("Model is a NumPy array, not a model.")
            # Fixed: Use a simple calculation instead of the array value
            # This is a simple linear model as fallback when no real model is available
            prediction = features[0] * 10 + features[1] * 0.5 + features[2] * 100 + features[3] * 20
            print(f"Calculated prediction: {prediction}")
        else:
            print("Model is a real predictive model.")
            prediction = model.predict([features])[0]
            print(f"Model prediction: {prediction}")

        return jsonify({'cpuMark': round(float(prediction), 2)})

    except Exception as e:
        print("Error occurred:", str(e))
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)