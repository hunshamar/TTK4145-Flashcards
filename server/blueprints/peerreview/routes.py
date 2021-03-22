from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from .peerreview import *

import datetime

peerreviewBlueprint = Blueprint("peerreview", __name__)
from ..user.routes import admin_only

from time import sleep
from ..values import DELAY_S




# @peerreviewBlueprint.route("/api/createpeerreviewsessions", methods=["POST"])
@peerreviewBlueprint.route("/api/admin/peerreviews", methods=["POST"])
@jwt_required
@admin_only
def peerreviews_create():      
    try:        
        group_id = request.json["groupId"]
        due_date = request.json["dueDate"]
        n_reviews = request.json["numberOfReviews"]

        due_date_python_format = datetime.datetime.strptime(due_date, '%Y-%m-%dT%H:%M:%S.%fZ')

        addPeerReviewForAllStudents(int(group_id), due_date_python_format, int(n_reviews))

        return jsonify({"status": "success"})

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))       

# @peerreviewBlueprint.route("/api/addpeerreview", methods=["POST", "GET"])
# @jwt_required
# @admin_only
# def add_peerreview():      
#     try:      
        

#         user_id = request.json["useId"]
#         group_id = request.json["groupId"]
#         due_date = request.json["dueDate"]
#         n_reviews = request.json["numberOfReviews"]
#         addPeerReview(group_id, user_id, due_date, n_reviews)

#         return jsonify({"success": "true"})

#     except Exception as e:
#         print(e)
#         return(jsonify({"error": str(e)}))       


# @peerreviewBlueprint.route("/api/peerreviews", methods=["GET"])
# def get_peerreviews():      
#     try:        
#         return jsonify(getAllPeerreviews())

#     except Exception as e:
#         print(e)
#         return(jsonify({"error": str(e)}))       
        
@peerreviewBlueprint.route("/api/currentuser/peerreviews/<pid>", methods=["GET"])
@jwt_required
def get_peerreview(pid):      
    try:        

        ## add check
        return jsonify(getPeerReview(int(pid)))

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))       




@peerreviewBlueprint.route("/api/currentuser/peerreviews", methods=["GET"])
@jwt_required
def get_user_peerreviews():      
    try:        
        uid = get_jwt_identity()
        return jsonify(getUserPeerreviews(uid))

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))   

@peerreviewBlueprint.route("/api/peerreview/<pid>/flashcards", methods=["GET"])
@jwt_required
def get_peerreview_flashcards(pid):      
    try:        
        return jsonify(getPeerreviewCards(int(pid)))

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))       


@peerreviewBlueprint.route("/api/currentuser/peerreview/<pid>/cardratings", methods=["GET"])
@jwt_required
def get_ratings_in_peerreview(pid):      
    try:        
        uid = get_jwt_identity()
        peerreview = Peerreview.query.get(pid)



        return jsonify(peerreview.get_ratings())

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))   

### temp
@peerreviewBlueprint.route("/api/deleteall", methods=["GET"])
def delete_peer():      
    deleteAllPeerReviews()
    return jsonify("true")


