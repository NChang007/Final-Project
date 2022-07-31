"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites
from api.utils import generate_sitemap, APIException


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

api = Blueprint('api', __name__)

# login Route-----------------------------------------------------------------------------
@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if request.method == 'POST':
      email = request.json.get("email", None)
      password = request.json.get("password", None)

      if not email:
          return jsonify({"msg": "Username is required"}), 400
      if not password:
          return jsonify({"msg": "Password is required"}), 400

      user = User.query.filter_by(email=email).first()
      if not user:
          return jsonify({"msg": "Username/Password are incorrect"}), 401

      if not check_password_hash(user.password, password):
          return jsonify({"msg": "Username/Password are incorrect"}), 401

      # create token
      expiration = datetime.timedelta(days=3)
      access_token = create_access_token(identity=user.email, expires_delta=expiration)

      access_token = create_access_token(identity=email)
      return jsonify(access_token=access_token)

    return jsonify(msg="wrong user")

# create user -----------------------------------------------------------------------------------------------------------
@api.route('/createUser', methods=['POST'])
def createUser():
  if request.method == 'POST':
    request_body = request.get_json()
    print(request_body)

    if not request_body["Uname"]:
      return jsonify({"msg": "Name is required"}), 400
    if not request_body["email"]:
      return jsonify({"msg": "Email is required"}), 400
    if not request_body["password"]:
      return jsonify({"msg": "Password is required"}), 400

    user = User.query.filter_by(email=request_body["email"]).first()
    if user:
      return jsonify({"msg": "Username  already exists"}), 400

    user = User(
          name = request_body["Uname"],
          email = request_body["email"],
          password = generate_password_hash(request_body["password"]),
      )

    db.session.add(user)   
    db.session.commit()
    # favorites = getUserFavorite(1)
    # favorites = [favorite.serialize() for user in User]
    return jsonify({"created": "Thanks. your register was successfully", "status": "true"}), 200




# get all favorites------------------------------------------------------------------------------------------------------
@api.route('/favorites', methods=['GET'])
def getAllFavorites():
  # receive the token
  # get user id through token
  favorites = getUserFavorite(User.id)
  favorites = [favorite.serialize() for favorite in favorites]
  return jsonify(favorites=favorites)

#add a fave---------------------------------------------------------------------------------------------------------------
@api.route('/addfavorites', methods=['POST'])
def addFavorite():
  request_body = request.get_json()
  print(request_body)
  favorite = Favorites(
    fave_id = request_body["fave_id"],
    name = request_body[{breed.name}],
    item_type = request_body["item_type"],
    user_id = request_body["id"]
  )

  db.session.add(favorite)   
  db.session.commit()
  favorites = getUserFavorite({User.id})
  favorites = [favorite.serialize() for favorite in favorites]
  return jsonify(favorites=favorites)

# remove fav----------------------------------------------------------------------------------------------------
@api.route('/deletefav/<int:id>', methods=['DELETE'])
def removeFav(id):
  Favorites.query.filter_by(id=id).delete()
  db.session.commit()
  # return the updated list
  favorites = getUserFavorite(1)
  favorites = [favorite.serialize() for favorite in favorites]
  return jsonify(favorites=favorites)

def getUserFavorite(id):
  favorites = Favorites.query.all()
  if favorites is None:
    return "This page does not exist"
  else:
    f = []
    for fav in favorites: 
      if fav.user_id == id:
        f.append(fav)
    return f
