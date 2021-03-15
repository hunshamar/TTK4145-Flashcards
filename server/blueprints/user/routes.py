from flask import Blueprint, jsonify, redirect, request, session, make_response
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, \
 get_jwt_identity, jwt_refresh_token_required, create_refresh_token, get_raw_jwt


# from flask_login import *

from functools import wraps

from time import sleep
from ..values import DELAY_S

jwt = JWTManager()
import requests
import json

import os
from dotenv import load_dotenv
load_dotenv()

userBlueprint = Blueprint("user", __name__)

from .invalid_token import *
from .user import *

import hashlib

def admin_only(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        uid = get_jwt_identity()
        user = getUser(uid)

        print("is admin", user.is_admin())
        
        if user.is_admin():                 
            return f(*args, **kwds) # continue
        else:
            raise Exception("Not admin")
            return jsonify({"error": "Not admin"})
    return wrapper

def password_protected(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        if (request.json["admin_password"] == str(os.environ.get("ADMIN_PASSWORD"))):
            return f(*args, **kwds)
        else:
            raise Exception("Wrong password")
            return jsonify({"error not correct pw"})
    return wrapper


@userBlueprint.route("/api/manualaddadmin/", methods=["POST"])
@password_protected
def manual_add_admin():
    try:
        email = request.json["email"]
        username = request.json["username"]
        if not (username and email):
            raise Exception("Missing credentials for username and or email")

        adminUser = makeAdmin(getUserId(email, username))
        return jsonify(adminUser)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@userBlueprint.route("/api/addadmin/<uid>")
@jwt_required
@admin_only
def add_admin(uid):
    sleep(DELAY_S)
    try:
        adminUser = makeAdmin(int(uid))
        return jsonify(adminUser)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})





@userBlueprint.route("/api/removeadmin/<uid>")
@jwt_required
@admin_only
def remove_admin(uid):
    sleep(DELAY_S)
    try:
        adminUser = removeAdmin(int(uid))
        return jsonify(adminUser)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})



@userBlueprint.route("/api/getcurrentuser")
@jwt_required
def get_current_user():
    sleep(DELAY_S)
    try:
        uid = get_jwt_identity()
        return jsonify(getUser(uid).to_dict())
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})



@userBlueprint.route("/api/users/all")
@jwt_required
@admin_only
def users():
    sleep(DELAY_S)
    try:
        return jsonify(getAllUsers())
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@userBlueprint.route("/api/users/role=<role>")
@jwt_required
@admin_only
def users_filter(role):
    sleep(DELAY_S)
    try:

            
        return jsonify(getUsersWithRole(role))
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

@userBlueprint.route("/api/users/search/role=<role>/searchphrase=<searchphrase>")
@jwt_required
@admin_only
def users_search(role, searchphrase):
    sleep(DELAY_S)
    try:
        return jsonify(searchUsers(role, searchphrase))
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

@userBlueprint.route("/api/logintoken", methods=["GET"])
def login_token():
    try:
        apiKey = str(os.environ.get("FEIDE_API_KEY"))
        feide_token = requests.get("https://www.itk.ntnu.no/api/feide_token.php?apiKey="+apiKey)

        tokenstring = apiKey+feide_token.text    
        authenticityToken = hashlib.sha1(tokenstring.encode('utf-8')).hexdigest() ## Encrypt with sha1
        session["authenticityToken"] = authenticityToken

        ## Return feide url to client side for external login. 
        url = "https://www.itk.ntnu.no/api/feide.php?token="+feide_token.text+"&returnURL=http://localhost:5000/api/userdata"
        
        return jsonify({"url": url})        
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

# Protect this route... 
@userBlueprint.route("/api/userdata", methods=["POST", "GET"])
def user_data():    

    print(request.headers)
    try: 
        if request.method == "GET": # External login from feide
            authenticityToken = session.pop("authenticityToken", None)
            userdata =  request.args.getlist('userdata')[0]
            userdata_dict = json.loads(userdata)
                
            if (userdata_dict["authenticityToken"] == authenticityToken): 
                print("Authenticity token OK")
                session["userdata"] = userdata_dict
                print("added userdata to session:")       

                return redirect("http://localhost:3000/loginfunc")

            else:
                return redirect(jsonify("Bad authenticityToken"))



        if request.method == "POST": # Alternative login
        
            userdata = request.json
            username = userdata["username"]
            email = userdata["email"]
            name = userdata["name"]

            if userRegistred(email, username):
                print("added to session exists", session.get("userdata"))

            elif usernameRegistred(username) or emailRegistred(email):
                raise Exception("duplicate. Username and email must either belong to a existing user or be unique")
            
            else:
                print("added to session new", session.get("userdata"))


            session["userdata"] = userdata
            return jsonify({"status": "success"})
            
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})



@userBlueprint.route("/api/login/callback")
def login_callback():
    sleep(DELAY_S)
    try:
        if session.get("userdata"):
            userdata = session["userdata"]
            username = userdata["username"]
            email = userdata["email"]
            name = userdata["name"]

            print(username, email, name)

            if not usernameRegistred(username):
                addUser(username, email, name)

            # user = userRegistred(email, username)[0]

            if not userRegistred(email, username):
                raise Exception("error fetching user")
            
            user = getUser(getUserId(email, username))

            token = create_access_token(identity=user.id)        
            refresh_token = create_refresh_token(identity=user.id)
            if not (token and refresh_token):
                raise Exception("Error creating tokens")
            return jsonify({"user_token": token, "refresh_token": refresh_token})
        else:   
            raise Exception("Login callback session error")
        
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})



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
        print("logged asd yes")
        invalid_token = InvalidToken(jti=jti)
        invalid_token.save()
        return jsonify({"success": True})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})
