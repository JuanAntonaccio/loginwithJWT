"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user1=User.query.filter_by(email=email)
    
    if not email or not password :
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)  

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.

@api.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    current_user = get_jwt_identity()
    usuarios=User.query.all()
    

    if not usuarios:
        return jsonify("no se encontraron usuarios"),404
    
    usuarios = list(map(lambda user: user.serialize(), usuarios ))    
    return jsonify(usuarios), 200

@api.route('/users', methods=['POST'])
def add_user():
    # primero leo lo que viene en el body
    body_us=json.loads(request.data)
    #print (body_us)
    usuario=User(email=body_us['email'],password=body_us['password'],is_active=body_us['is_active'])
    db.session.add(usuario)               
    db.session.commit()
    
    

    usuarios=User.query.all()
    usuarios = list(map(lambda usuario: usuario.serialize(), usuarios ))
    if not usuarios:
        return jsonify("no se encontraron usuarios"),404
        
    return jsonify(usuarios), 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    
    current_user = get_jwt_identity()
    print(current_user)
    return jsonify(logged_in_as=current_user), 200      