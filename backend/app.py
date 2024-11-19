import os
import hashlib
import random
from flask import Flask, request, send_from_directory, jsonify
import requests
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)
CORS(app)
cred = credentials.Certificate("sdkey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
BASE_DIR = "photos"
if not os.path.exists(BASE_DIR):
    os.makedirs(BASE_DIR)


def save_image(user_id):
    image_url = "https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"
    try:
        print("Saving image...")
        user_dir = os.path.join(BASE_DIR, user_id)
        if not os.path.exists(user_dir):
            os.makedirs(user_dir)
        random_number = random.randint(0, 1_000_000)
        image_name = hashlib.md5(str(random_number).encode()).hexdigest() + ".png"
        image_path = os.path.join(user_dir, image_name)
        response = requests.get(image_url)
        response.raise_for_status()
        with open(image_path, "wb") as img_file:
            img_file.write(response.content)
        image_doc = {
            "user_id": user_id,
            "image_name": image_name,
            "image_path": image_path,
        }
        db.collection("images").add(image_doc)
        print(f"Image metadata stored in Firestore: {image_doc}")

        return image_name, user_dir
    except Exception as e:
        raise RuntimeError(f"Failed to save image: {e}")

@app.route("/create/<user_id>", methods=["POST"])
def create_image(user_id):
    try:
        request_data = request.get_json()
        prompt = request_data.get("prompt", "default prompt") 
        print(f"Received request for user_id: {user_id} with prompt: {prompt}")
        image_name, user_dir = save_image(user_id)
        return jsonify({"message": "Image saved successfully", "path": f"{user_dir}/{image_name}"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route("/get_image/<user_id>/<image_name>", methods=["GET"])
def get_image(user_id, image_name):
    try:
        user_dir = os.path.join(BASE_DIR, user_id)
        image_path = os.path.join(user_dir, image_name)
        if not os.path.exists(image_path):
            return jsonify({"error": "Image not found"}), 404
        return send_from_directory(user_dir, image_name)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/get_user_images/<user_id>", methods=["GET"])
def get_user_images(user_id):
    try:
        docs = db.collection("images").where("user_id", "==", user_id).stream()
        images = [{"image_name": doc.to_dict()["image_name"], "path": doc.to_dict()["image_path"]} for doc in docs]
        return jsonify(images), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
