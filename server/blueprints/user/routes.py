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

userBlueprint = Blueprint("user", __name__)

from .invalid_token import *
from .user import *

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

@userBlueprint.route("/api/addadmin/<uid>")
def add_admin(uid):
    sleep(DELAY_S)
    try:
        makeAdmin(int(uid))
        return jsonify("success")
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})



@userBlueprint.route("/api/adminonly")
@jwt_required
@admin_only
def admin_page():
    sleep(DELAY_S)
    try:
        print("signed in ???")
        return jsonify({"status": "you successfully accessed because you are an admin. gz"})

            # if "Admin" in current_user.roles:
            # else:
            #     flash("You need to be an admin to view this page.")
            #     return jsonify({error: "error with admin elns"})
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



@userBlueprint.route("/api/users")
def users():
    sleep(DELAY_S)
    try:
        return jsonify(getAllUsers())
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

@userBlueprint.route("/api/logintoken")
def login_token():
    sleep(DELAY_S)
    try:
        token = requests.get("https://www.itk.ntnu.no/api/feide_token.php?apiKey=3b41006f342e166d2320b82059c35784")
        token_string = token.text
        return jsonify({"token": token_string})
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



@userBlueprint.route("/api/userdata", methods=["POST", "GET"])
def user_data():
    sleep(DELAY_S)
    try: 
        if request.method == "GET": # External login
            print("FROM FEIDE")
            userdata =  request.args.getlist('userdata')[0]
            userdata_dict = json.loads(userdata)
            print(type(userdata_dict))
            session["userdata"] = userdata_dict
            print("added to session:")      
            return redirect("http://localhost:3000/loginfunc/")


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
        return jsonify({"error": str(e)})
