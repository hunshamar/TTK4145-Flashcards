from ..values import DELAY_S
from time import sleep
from ..user.routes import admin_only
from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from .peerreview import *

import datetime

peerreviewBlueprint = Blueprint("peerreview", __name__)


@peerreviewBlueprint.route("/api/admin/peerreviews", methods=["POST"])
@jwt_required
@admin_only
def peerreviews_create():
    try:
        group_id = request.json["groupId"]
        due_date = request.json["dueDate"]
        n_reviews = request.json["numberOfReviews"]

        due_date_python_format = datetime.datetime.strptime(
            due_date, '%Y-%m-%dT%H:%M:%S.%fZ')

        add_peer_reviews_for_all_students(
            int(group_id), due_date_python_format, int(n_reviews))

        return jsonify({"status": "success"})

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))


@peerreviewBlueprint.route("/api/admin/peerreviews", methods=["PUT"])
@jwt_required
@admin_only
def peerreview_edit():
    try:
        group_id = request.json["groupId"]
        peer_review_due_date = request.json["dueDate"]

        due_date_python_format = datetime.datetime.strptime(
            peer_review_due_date, '%Y-%m-%dT%H:%M:%S.%fZ')

        edit_peerreview(int(group_id), due_date_python_format)

        return jsonify({"status": "success"})

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))



@peerreviewBlueprint.route("/api/admin/peerreviews/<cgid>", methods=["GET"])
@jwt_required
@admin_only
def peerreviews_get_all(cgid):
    try:
        return jsonify(get_cardgroup_peerreviews(int(cgid)))

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))

@ peerreviewBlueprint.route("/api/admin/cardgroup/<cgid>/peerreview", methods=["DELETE"]) 
@jwt_required
@admin_only
def delete_peer(cgid):
    delete_all_peerreviews_in_cardgroup(int(cgid))
    return jsonify({"status": "success"})



@peerreviewBlueprint.route("/api/currentuser/peerreviews", methods=["GET"])
@jwt_required
def peerreview_get_current_users_reviews():
    try:
        uid = get_jwt_identity()
        return jsonify(get_user_peerreviews(uid))

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))

@peerreviewBlueprint.route("/api/currentuser/peerreview/<pid>", methods=["GET"])
@jwt_required
def get_peerreview(pid):
    try:

        peer_review = get_peer_review(int(pid))

        if peer_review.user_id != get_jwt_identity():
            raise Exception(
                "Getted Peer Review does not belong to current user")

        return jsonify(peer_review.to_dict())

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))


@peerreviewBlueprint.route("/api/currentuser/peerreview/<prid>/cardratings", methods=["GET"])
@jwt_required
def peerreview_get_ratings(prid):

    try:
        uid = get_jwt_identity()

        return jsonify(get_ratings_in_peerreview(int(prid)))

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))




