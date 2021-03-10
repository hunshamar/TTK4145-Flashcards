from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

import datetime
from ..user.user import User, getUser
from .cardgroup import *
from ..user.routes import admin_only

cardgroupBlueprint = Blueprint("cardgroup", __name__)

from time import sleep #test test
from ..values import DELAY_S

@cardgroupBlueprint.route("/api/cardgroups")
def cardgroups():    
    sleep(DELAY_S)
    try:
        return jsonify(getAllCardgroups())
    except Exception as e:
        return jsonify({"error": str(e)})



@cardgroupBlueprint.route("/api/cardgroup/<cgid>", methods=["GET"])
def cardgroup(cgid):   
    sleep(DELAY_S) 
    try:
        return jsonify(getCardgroup(int(cgid)).to_dict())
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})



@cardgroupBlueprint.route("/api/addcardgroup", methods=["POST"])
@jwt_required
@admin_only
def add_cardgroup():
    sleep(DELAY_S)
    try:
        title = request.json["title"]
        number_of_cards_due = request.json["numberOfCardsDue"]
        due_date = request.json["dueDate"] ## GMT! 
        due_date_python_format = datetime.datetime.strptime(due_date, '%Y-%m-%dT%H:%M:%S.%fZ')

        if not (title or number_of_cards_due or due_date):
            raise Eception("Invalid form for cardgroup")

        cardgroup = addCardgroup(title, due_date_python_format, number_of_cards_due)
        return jsonify(cardgroup)
    except Exception as e:
        print(e)
        return {"error": str(e)}

@cardgroupBlueprint.route("/api/deletegroup/<cgid>", methods=["GET","DELETE"])
# @jwt_required
def delete_group(cgid):
    sleep(DELAY_S)
    print(cgid, "is deleted yes")
    # return jsonify({"error": "here"})
    try:         

        delCardgroup(cgid)
        return jsonify({"success": "deleted all cards and groups"})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


