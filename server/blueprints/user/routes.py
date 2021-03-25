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
        user = get_user(uid)
        
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

        admin_user = make_admin(getUserId(email, username))
        return jsonify(admin_user)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@userBlueprint.route("/api/admin/<uid>", methods=["POST", "DELETE"])
@jwt_required
@admin_only
def admin(uid):
    sleep(DELAY_S)
    try:
        if request.method=="POST":
            admin_user = make_admin(int(uid))
            return jsonify(admin_user)
        if request.method=="DELETE":
            admin_user = remove_admin(int(uid))
            return jsonify(admin_user)


    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})



@userBlueprint.route("/api/currentuser/user", methods=["GET"])
@jwt_required
def get_current_user():
    sleep(DELAY_S)
    try:
        uid = get_jwt_identity()
        return jsonify(get_user(uid).to_dict())
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})



@userBlueprint.route("/api/admin/users/", methods=["GET"])
@jwt_required
@admin_only
def users_all():
    sleep(DELAY_S)
    try:
        return jsonify(get_all_users())
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@userBlueprint.route("/api/admin/users/role=<role>", methods=["GET"])
@jwt_required
@admin_only
def users_filter(role):
    sleep(DELAY_S)
    try:            
        return jsonify(get_users_with_role(role))
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

@userBlueprint.route("/api/admin/users/search/role=<role>/q=<searchphrase>", methods=["GET"])
@jwt_required
@admin_only
def users_search(role, searchphrase):
    sleep(DELAY_S)
    try:
        return jsonify(serach_users(role, searchphrase))
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@userBlueprint.route("/api/login/url", methods=["GET"])
def login_token():
    try:
        api_key = str(os.environ.get("FEIDE_API_KEY"))
        feide_token = requests.get("https://www.itk.ntnu.no/api/feide_token.php?apiKey="+api_key)
    
        ## Return feide url to client side for external login. 
        session["feide_token"] = feide_token.text
        url = "https://www.itk.ntnu.no/api/feide.php?token="+feide_token.text+"&returnURL=http://localhost:5000/api/login/userdata"
        return jsonify({"url": url})        
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

# Protect this route... 
@userBlueprint.route("/api/login/userdata", methods=["POST", "GET"])
def user_data():    


    print(request.headers)
    try: 
        if request.method == "GET": # External login from feide
            userdata = request.values.get("userdata")
            sha1 = request.values.get("sha1")
            
            api_key = str(os.environ.get("FEIDE_API_KEY"))

            enc = api_key + session.pop("feide_token") + userdata

            encryped = hashlib.sha1((str(enc)).encode('utf-8')).hexdigest() ## Encrypt with sha1
            
            userdata_dict = json.loads(userdata)

            print(f"sha1: {sha1}")
            print(f"encryped: {encryped}")
                
            if (encryped == sha1): 
                print("sha1 ok")
                session["userdata"] = userdata_dict
                print("added userdata to session:")       

                return redirect("http://localhost:3000/loginfunc")
                # return redirect("/loginfunc")

            else:
                print("sha1 error")
                return(jsonify("Bad authenticity token"))



        if request.method == "POST": # Alternative login
        
            userdata = request.json
            username = userdata["username"]
            email = userdata["email"]
            name = userdata["name"]

            if user_registered(email, username):
                print("added to session exists", session.get("userdata"))

            elif username_registered(username) or email_registered(email):
                raise Exception("duplicate. Username and email must either belong to a existing user or be unique")
            
            else:
                print("added to session new", session.get("userdata"))


            session["userdata"] = userdata
            return jsonify({"status": "success"})
            
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})



@userBlueprint.route("/api/login/callback", methods=["GET"])
def login_callback():
    sleep(DELAY_S)
    try:
        if session.get("userdata"):
            userdata = session["userdata"]
            username = userdata["username"]
            email = userdata["email"]
            name = userdata["name"]

            print(username, email, name)

            if not username_registered(username):
                add_user(username, email, name)

            # user = userRegistred(email, username)[0]

            if not user_registered(email, username):
                raise Exception("error fetching user")
            
            user = get_user(get_user_id(email, username))

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


@userBlueprint.route("/api/token/expired", methods=["POST"])
@jwt_required
def check_if_token_expire():
    return jsonify({"success": True})


@userBlueprint.route("/api/token/refresh", methods=["POST"])
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


@userBlueprint.route("/api/logout/refreshtoken", methods=["POST"])
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
