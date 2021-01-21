from flask import Blueprint, jsonify, redirect, request, session
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

import requests
import json
from flask_cors import CORS
import webbrowser
import urllib.parse as urlparse
from urllib.parse import parse_qs
from db import db


userBlueprint = Blueprint("user", __name__)

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True) # primary_key makes it so that this value is unique and can be used to identify this record.
    username = db.Column(db.String(24), unique=True)
    email = db.Column(db.String(64))
    name = db.Column(db.String(64))

    # Constructor
    def __init__(self, username, email, name):
        self.username = username
        self.email = email
        self.name = name

def addUser(username, email, name):
    try:
        user = User(username, email, name)
        db.session.add(user)
        db.session.commit()
        return True
    except Exception as e:
        print(e)
        return False   
    
def userRegistred(username):
    users = User.query.all()
    user = list(filter(lambda x: x.username == username, users))
    if len(user) >= 1:
        return True 
    else:
        return False


def getAllUsers():
    users = User.query.all()
    return [{"id": i.id, "username": i.username, "email": i.email, "name": i.name} for i in users]

def getUser(uid):

    # check type, uid must be int

    users = User.query.all()
    print(users[0].id, uid)
    user = list(filter(lambda x: x.id == uid, users))[0]
    # print(user)
    return {"id": user.id, "username": user.username, "email": user.email, "name": user.name}

@userBlueprint.route("/api/getcurrentuser")
@jwt_required
def get_current_user():
    uid = get_jwt_identity()
    print("her it comes", uid)
    return jsonify(getUser(uid))


@userBlueprint.route("/api/users")
def users():
    return jsonify(getAllUsers())

@userBlueprint.route("/api/logintoken")
def login():

    token = requests.get("https://www.itk.ntnu.no/api/feide_token.php?apiKey=3b41006f342e166d2320b82059c35784")
    token_string = token.text

    return jsonify(token_string)

@userBlueprint.route("/api/login/callback")
def login_callback():

    if session.get("userdata"):
        
        userdata = session["userdata"]
        username = userdata["username"]
        email = userdata["email"]
        name = userdata["name"]

        print(username, email, name)

        if not userRegistred(username):
            addUser(username, email, name)
        
        user = list(filter(lambda x: x["email"] == email and x["username"] == username, getAllUsers()))
        if (len(user) == 1):   
            token = create_access_token(identity=user[0]["id"])        
            print("token yes:", token)
            return jsonify(token)
        else:
            print("multiple users exists. Error")
            return jsonify("multiple users exists. Error")    
    else:
        return jsonify("error, user not valid")

@userBlueprint.route("/api/userdata")
def stuff():

    print("type")

    userdata =  request.args.getlist('userdata')[0]
    userdata_dict = json.loads(userdata)
    print(type(userdata_dict))

    session["userdata"] = userdata_dict

    print("added to session:")
    

    response = redirect("http://localhost:3000/home/")
    return response


