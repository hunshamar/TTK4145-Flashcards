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
        due_date = request.json["dueDate"]
        
        print("year:", due_date["year"])
        print("month:", due_date["month"])
        print("day:", due_date)
        year = int(due_date["year"])
        month = int(due_date["month"])
        date = int(due_date["date"])
        hour = int(due_date["hour"])
        minute = int(due_date["minute"])
        second = int(due_date["second"])
        due_date = datetime.datetime(year, month, date, hour, minute, second)

        if not (title or number_of_cards_due or due_date):
            raise Eception("Invalid form for cardgroup")

        cardgroup = addCardgroup(title, due_date, number_of_cards_due)
        return jsonify(cardgroup)
    except Exception as e:
        print(e)
        return {"error": str(e)}
