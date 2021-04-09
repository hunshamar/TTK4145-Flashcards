from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from .cardrating import *

cardratingBlueprint = Blueprint("cardRating", __name__)
from ..user.routes import admin_only

from time import sleep
from ..values import DELAY_S



@cardratingBlueprint.route("/api/currentuser/peerreview/<prid>/cardratings", methods=["GET"])
@jwt_required
def cardratings_get(prid):
    print("på an igjen")
    
    try:
        uid = get_jwt_identity()
        return(jsonify(add_ratings_to_peerreview(uid, int(prid))))
    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))       




@cardratingBlueprint.route("/api/currentuser/cardrating/<rid>/difficulty", methods=["PATCH"])
@jwt_required
def cardrating_save_difficulty(rid):   
    try:        
        difficulty_rating = request.json["difficulty"]

        print("dif", difficulty_rating)

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

        print("qq", quality_rating)

        uid = uid = get_jwt_identity()


        rating = save_quality_rating(uid, rid, quality_rating)
        return jsonify(rating.to_dict())

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))       


@cardratingBlueprint.route("/api/currentuser/cardrating/<rid>", methods=["PUT"])
@jwt_required
def cardrating_add(rid):      
    try:        
        difficulty_rating = request.json["difficulty"]
        quality_rating = request.json["quality"]
        # duplicate_card_ids = request.json["duplicateCardIds"]
        # print("her")
        # print(duplicate_card_ids)

        print(difficulty_rating, quality_rating)

        uid = uid = get_jwt_identity()


        rating = save_rating(uid, rid, difficulty_rating , quality_rating)
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




@cardratingBlueprint.route("/api/delratings")
# @jwt_required
def del_all_ratings():    
    sleep(DELAY_S)
    delete_all_cardratings()

    return "success"