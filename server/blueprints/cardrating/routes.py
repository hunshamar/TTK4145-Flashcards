from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from .cardrating import *

cardratingBlueprint = Blueprint("cardRating", __name__)
from ..user.routes import admin_only

from time import sleep
from ..values import DELAY_S



@cardratingBlueprint.route("/api/addrating", methods=["POST"])
@jwt_required
def add_rating():       
    sleep(1)
    try:        
        difficulty_rating = request.json["difficulty"]
        quality_rating = request.json["quality"]

        print(difficulty_rating, quality_rating)

        cid = request.json["cardId"]
        uid = uid = get_jwt_identity()

        rating = addRating(uid, cid, difficulty_rating , quality_rating)
        return jsonify(rating)

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))       

@cardratingBlueprint.route("/api/getrating/<cid>", methods=["GET"])
@jwt_required
def get_rating(cid):    
    sleep(DELAY_S)
    try:        
        cid = int(cid)
        uid = uid = get_jwt_identity()
        rating = getRating(uid, cid)
        if rating: 
            return jsonify(rating.to_dict())
        else:
            return jsonify({"status":"no rating"})
    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))    

@cardratingBlueprint.route("/api/deletecardrating/<cid>", methods=["GET"])
@jwt_required
@admin_only
def delete_card_rating(cid):    
    sleep(DELAY_S)
    try:        
        cid = int(cid)
        ratings = deleteCardRatings(cid)
        return jsonify(ratings)

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))        

@cardratingBlueprint.route("/api/ratings")
# @jwt_required
def get_ratings():    
    sleep(DELAY_S)
    return jsonify(getAllRatings())