from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from .peerreview import *

import datetime

peerreviewBlueprint = Blueprint("peerreview", __name__)
from ..user.routes import admin_only

from time import sleep
from ..values import DELAY_S




@peerreviewBlueprint.route("/api/createpeerreviewsessions", methods=["POST"])
@jwt_required
@admin_only
def add_peerreview_for_all_students():      
    try:        
        group_id = request.json["groupId"]
        due_date = request.json["dueDate"]
        n_reviews = request.json["numberOfReviews"]

        due_date_python_format = datetime.datetime.strptime(due_date, '%Y-%m-%dT%H:%M:%S.%fZ')

        addPeerReviewForAllStudents(int(group_id), due_date_python_format, int(n_reviews))

        return jsonify({"success": "true"})

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))       

@peerreviewBlueprint.route("/api/addpeerreview", methods=["POST", "GET"])
def add_peerreview():      
    try:        

        group_id = 1
        due_date = datetime.datetime.now()
        reviews = 3
        user_id = 2

        addPeerReview(group_id, user_id, due_date, reviews)

        return jsonify({"success": "true"})

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))       

@peerreviewBlueprint.route("/api/peers", methods=["POST", "GET"])
def get_peerreviews():      
    try:        
        return jsonify(getAllPeerreviews())

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))       
        
@peerreviewBlueprint.route("/api/peerreview/<pid>", methods=["GET"])
def get_peerreview(pid):      
    try:        
        return jsonify(getPeerReview(int(pid)))

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))       




@peerreviewBlueprint.route("/api/userpeerreviews/", methods=["GET"])
@jwt_required
def get_user_peerreviews():      
    try:        
        uid = get_jwt_identity()
        return jsonify(getUserPeerreviews(uid))

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))   

@peerreviewBlueprint.route("/api/peerreviewflashcards/<peerreviewid>", methods=["GET"])
@jwt_required
def get_peerreview_flashcards(peerreviewid):      
    try:        
        return jsonify(getPeerreviewCards(peerreviewid))

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))       



@peerreviewBlueprint.route("/api/deleteall/", methods=["GET"])
def delete_peer():      
    deleteAllPeerReviews()
    return jsonify("true")



@peerreviewBlueprint.route("/api/ratingsinpeerreview/<pid>", methods=["GET"])
@jwt_required
def get_ratings_in_peerreview(pid):      
    try:        
        uid = get_jwt_identity()
        return jsonify(getRatingsInPeerreview(pid, uid))

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))   