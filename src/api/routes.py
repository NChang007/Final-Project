"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# login Route-----------------------------------------------------------------------------
@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # get user from db
    # user = Users.query.filter_by(email='test')
    # print(user)
    # if not user:
    #     return jsonify({"msg": "user doesn't exist"}), 401
    # if user['password'] != password:
    #     return jsonify({"msg": "wrong password"}), 401

    if email == 'test@test' and password == 'test' :

    #   #get all favorites for user
    #   favorites = getUserFavorite(1)
    #   favorites = [favorite.serialize() for favorite in favorites]

      access_token = create_access_token(identity=email)
      return jsonify(access_token=access_token)

    return jsonify(msg="wrong user")

# create user -----------------------------------------------------------------------------------------------------------
@api.route('/createUser', methods=['POST'])
def createUser():
  request_body = request.get_json()
  print(request_body)
  user = User(
        id = request_body["id"],
        name = request_body["name"],
        email = request_body["email"],
        password = request_body["password"],
    )

  db.session.add(user)   
  db.session.commit()
  favorites = getUserFavorite(1)
  favorites = [favorite.serialize() for user in User]
  return jsonify(user=user)