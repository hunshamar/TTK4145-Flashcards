from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

import datetime
from ..user.user import User, getUser
from .cardgroup import *
from ..user.routes import admin_only

cardgroupBlueprint = Blueprint("cardgroup", __name__)

from time import sleep #test test
from ..values import DELAY_S


@cardgroupBlueprint.route("/api/cardgroups", methods=["GET"])
def cardgroups_all():    
    sleep(DELAY_S)
    try:
        return jsonify(getAllCardgroups())
    except Exception as e:
        return jsonify({"error": str(e)})


@cardgroupBlueprint.route("/api/cardgroups/<cgid>", methods=["GET"])
def cardgroups(cgid):   
    sleep(DELAY_S) 
    try:
        return jsonify(getCardgroup(int(cgid)).to_dict())
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

@cardgroupBlueprint.route("/api/admin/cardgroups/<cgid>", methods=["PUT"])
def cardgroups_edit(cgid):   
    sleep(DELAY_S) 
    try:

        cardgroup_id = int(cgid)
        title = request.json["title"]
        number_of_cards_due = request.json["numberOfCardsDue"]
        due_date = request.json["dueDate"]
        due_date_python_format = datetime.datetime.strptime(due_date, '%Y-%m-%dT%H:%M:%S.%fZ')


        if not (title or number_of_cards_due or due_date):
            raise Eception("Invalid form for cardgroup")
    
        edited_cardgroup = editCardgroup(cardgroup_id, title, due_date_python_format, number_of_cards_due)


        return jsonify(edited_cardgroup)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})



@cardgroupBlueprint.route("/api/admin/cardgroups", methods=["POST"])
@jwt_required
@admin_only
def cardgroups_add():
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

@cardgroupBlueprint.route("/api/admin/cardgroups/<cgid>", methods=["DELETE"])
@jwt_required
@admin_only
def cardgroups_delete(cgid):
    sleep(DELAY_S)
    print(cgid, "is deleted yes")
    # return jsonify({"error": "here"})
    try:         

        delCardgroup(cgid)
        return jsonify({"success": "deleted all cards and groups"})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})



@cardgroupBlueprint.route("/api/admin/cardgroup/<cgid>/flashcards", methods=["GET"])
@jwt_required
@admin_only
def cardgroup_flashcards(cgid):
    sleep(DELAY_S)
    print(type(cgid), "find this")
    try:

        cardgroup = Cardgroup.query.get(int(cgid))
        
        return jsonify(cardgroup.get_flashcards())


        return jsonify(getCardgroupFlashcards(int(cgid)))
    except Exception as e:
        return jsonify({"error": str(e)})


