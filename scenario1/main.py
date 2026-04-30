from flask import Flask, request, jsonify
import logging
import os

app = Flask(__name__)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

@app.route('/receive', methods=['POST'])
def receive_data():
    """
    Accepts POST requests, logs the received data (JSON or form),
    and returns a success message.
    """
    if request.is_json:
        data = request.get_json()
        logging.info(f"Received JSON data: {data}")
    else:
        data = request.form
        logging.info(f"Received Form data: {data}")

    return jsonify({"status": "success", "message": "Data received and logged"}), 200

@app.route('/', methods=['GET'])
def index():
    """A simple index route to check if the app is running."""
    return "Receiver API is running!", 200

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(debug=True, host='0.0.0.0', port=port)
