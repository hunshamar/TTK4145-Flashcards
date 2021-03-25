from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from .cardrating import *

cardratingBlueprint = Blueprint("cardRating", __name__)
from ..user.routes import admin_only

from time import sleep
from ..values import DELAY_S



@cardratingBlueprint.route("/api/currentuser/cardrating/<cid>", methods=["POST"])
@jwt_required
def cardrating_add(cid):       
    sleep(1)
    try:        
        difficulty_rating = request.json["difficulty"]
        quality_rating = request.json["quality"]
        duplicate_card_ids = request.json["duplicateCardIds"]
        print("her")
        print(duplicate_card_ids)

        print(difficulty_rating, quality_rating)

        cid = int(request.json["cardId"])

        cid = int(cid)
        
        print("cid", cid)
        uid = uid = get_jwt_identity()


        rating = add_rating(uid, cid, difficulty_rating , quality_rating, duplicate_card_ids)
        return jsonify(rating)

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))       

@cardratingBlueprint.route("/api/currentuser/cardrating/<cid>", methods=["GET"])
@jwt_required
def cardrating_get(cid):    
    sleep(DELAY_S)
    try:        
        cid = int(cid)
        uid = uid = get_jwt_identity()
        rating = get_rating(uid, cid)
        if rating: 
            return jsonify(rating.to_dict())
        else:
            return jsonify({"status":"no rating"})
    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))    

@cardratingBlueprint.route("/api/admin/cardrating/<cid>", methods=["DELETE"])
@jwt_required
@admin_only
def cardrating_delete(cid):    
    sleep(DELAY_S)
    try:        
        cid = int(cid)
        ratings = delete_ratings_of_card(cid)
        return jsonify(ratings)

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))        




## remove
@cardratingBlueprint.route("/api/cardratings")
@jwt_required
def card():    
    sleep(DELAY_S)
    return jsonify(get_all_ratings())



@cardratingBlueprint.route("/api/delratings")
# @jwt_required
def del_all_ratings():    
    sleep(DELAY_S)
    delete_all_cardratings()

    return "success"