from ..values import DELAY_S
from time import sleep
from ..user.routes import admin_only
from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from .cardrating import *

cardratingBlueprint = Blueprint("cardRating", __name__)





@cardratingBlueprint.route("/api/currentuser/cardrating/<rid>/difficulty", methods=["PATCH"])
@jwt_required
def cardrating_save_difficulty(rid):
    try:
        difficulty_rating = request.json["difficulty"]


        uid = uid = get_jwt_identity()

        rating = save_difficulty_rating(uid, rid, difficulty_rating)
        return jsonify(rating.to_dict())

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))


@cardratingBlueprint.route("/api/currentuser/cardrating/<rid>/quality", methods=["PATCH"])
@jwt_required
def cardrating_save_quality(rid):
    try:
        quality_rating = request.json["quality"]


        uid = uid = get_jwt_identity()

        rating = save_quality_rating(uid, rid, quality_rating)
        return jsonify(rating.to_dict())

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))


@cardratingBlueprint.route("/api/currentuser/cardrating/<rid>/duplicates", methods=["PATCH"])
@jwt_required
def cardrating_add_duplicte(rid):

    try:

        sleep(DELAY_S)

        uid = get_jwt_identity()

        duplicates = request.json["duplicates"]
        print(duplicates)

        edit_duplicates(uid, rid, duplicates)

        return jsonify(edit_duplicates(uid, rid, duplicates))

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))



