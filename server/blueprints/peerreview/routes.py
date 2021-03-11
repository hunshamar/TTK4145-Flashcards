from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from .peerreview import *

import datetime

peerreviewBlueprint = Blueprint("peerreview", __name__)
from ..user.routes import admin_only

from time import sleep
from ..values import DELAY_S



@peerreviewBlueprint.route("/api/addpeerreview", methods=["POST", "GET"])
def add_peerreview():      
    try:        

        group_id = 1
        due_date = datetime.datetime.now()
        reviews = 3
        user_id = 1

        addPeerReview(group_id, user_id, due_date, reviews)

        return jsonify({"success": "true"})

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))       

@peerreviewBlueprint.route("/api/getpeer", methods=["POST", "GET"])
def get_peerreview():      
    try:        
        return jsonify(r_20_cards())

    except Exception as e:
        print(e)
        return(jsonify({"error": str(e)}))       

