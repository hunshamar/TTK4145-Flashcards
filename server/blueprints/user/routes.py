from flask import Blueprint, jsonify, redirect, request, session, make_response
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, \
 get_jwt_identity, jwt_refresh_token_required, create_refresh_token, get_raw_jwt

jwt = JWTManager()
import requests
import json

userBlueprint = Blueprint("user", __name__)

from .invalid_token import *
from .user import *

@userBlueprint.route("/api/getcurrentuser")
@jwt_required
def get_current_user():
    uid = get_jwt_identity()
    return jsonify(getUser(uid))


@userBlueprint.route("/api/users")
def users():
    return jsonify(getAllUsers())

@userBlueprint.route("/api/logintoken")
def login():

    try:
        token = requests.get("https://www.itk.ntnu.no/api/feide_token.php?apiKey=3b41006f342e166d2320b82059c35784")
        token_string = token.text
        return jsonify(token_string)
    except:
        return jsonify({"error": "error getting logintoken"})

@userBlueprint.route("/api/login/callback")
def login_callback():

    if session.get("userdata"):

        userdata = session["userdata"]
        username = userdata["username"]
        email = userdata["email"]
        name = userdata["name"]

        print(username, email, name)

        if not usernameRegistred(username):
            addUser(username, email, name)
        
        user = list(filter(lambda x: x["email"] == email and x["username"] == username, getAllUsers()))
        if (len(user) == 1):   
            token = create_access_token(identity=user[0]["id"])        
            refresh_token = create_refresh_token(identity=user[0]["id"])
            print("token yes:", token)
            return jsonify({"user_token": token, "refresh_token": refresh_token})
        else:
            print("multiple users exists. Error")
            return jsonify("multiple users exists. Error")    
    else:
        return jsonify({"error": "Login callback error"})

@userBlueprint.route("/api/userdata", methods=["POST", "GET"])
def user_data():
    if request.method == "GET":
        print("FROM FEIDE")
        userdata =  request.args.getlist('userdata')[0]
        userdata_dict = json.loads(userdata)
        print(type(userdata_dict))

        session["userdata"] = userdata_dict

        print("added to session:")
        

        return redirect("http://localhost:3000/loginfunc/")


    if request.method == "POST":
        
        print("from manual")
        userdata = request.json
        username = userdata["username"]
        email = userdata["email"]
        name = userdata["name"]

        if userRegistred(email, username):
            print("added to session exists", session.get("userdata"))

        elif usernameRegistred(username) or emailRegistred(email):
            print("duplicate. Username and email must either belong to a user or be unique")
            return jsonify({"status": "duplicate. Username and email must either belong to a existing user or be unique"})
        
        else:
            print("added to session new", session.get("userdata"))


        session["userdata"] = userdata
        return jsonify({"status": "success"})



    

@userBlueprint.route("/api/manuallogin", methods=["POST"])
def manual_login():

    print(request.json)

    userdata = request.json



    print(userdata["username"])
    print(userdata["name"])
    print(userdata["email"])



    # userdata =  request.args.getlist('userdata')[0]
    # userdata_dict = json.loads(userdata)
    # print(type(userdata_dict))

    session["userdata"] = userdata

    gett = session["userdata"]

    print(gett)

    print("added to session:")
    

    # response = redirect("http://localhost:3000/home/")

    response = "asdasd"
    return response






@jwt.token_in_blacklist_loader
def check_if_blacklisted_token(decrypted_token):
    jti = decrypted_token["jti"]
    return InvalidToken.is_invalid(jti)


@userBlueprint.route("/api/checkiftokenexpire", methods=["POST"])
@jwt_required
def check_if_token_expire():
    return jsonify({"success": True})


@userBlueprint.route("/api/refreshtoken", methods=["POST"])
@jwt_refresh_token_required
def refresh():
    identity = get_jwt_identity()
    token = create_access_token(identity=identity)
    return jsonify({"token": token})


@userBlueprint.route("/api/logout/access", methods=["POST"])
@jwt_required
def access_logout():
    jti = get_raw_jwt()["jti"]
    try:
        invalid_token = InvalidToken(jti=jti)
        invalid_token.save()
        return jsonify({"success": True})
    except Exception as e:
        print(e)
        return jsonify({"error": e.message})


@userBlueprint.route("/api/logout/refresh", methods=["POST"])
@jwt_refresh_token_required
def refresh_logout():
    jti = get_raw_jwt()["jti"]
    try:
        invalid_token = InvalidToken(jti=jti)
        invalid_token.save()
        return jsonify({"success": True})
    except Exception as e:
        print(e)
        return jsonify({"error": e.message})
