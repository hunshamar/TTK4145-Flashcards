
from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


from .flashcard import *

flashcardBlueprint = Blueprint("flashcard", __name__)
from ..user.routes import admin_only

from time import sleep
from ..values import DELAY_S



@flashcardBlueprint.route("/api/admin/flashcards", methods=["GET"])
@jwt_required
@admin_only
def flashcards_all():    
    sleep(DELAY_S)
    return jsonify(getAllFlashcards()) # make safe

@flashcardBlueprint.route("/api/flashcards/<cid>", methods=["GET"])
@jwt_required
@admin_only
def flashcards_get(cid):    
    sleep(DELAY_S)
    try:
        return jsonify(getFlashcard(cid).to_dict())
    except Exception as e:
        return jsonify({"error": str(e)})

@flashcardBlueprint.route("/api/currentuser/flashcards", methods=["POST"])
@jwt_required
def add_Flashcard():
    sleep(DELAY_S)
    print(request.json)
    try:
        front = request.json["front"]
        back = request.json["back"]
        cardgroupid = request.json["cardgroupid"]
        if not (front and back and cardgroupid):
            raise Exception("Error. Invalid form for card")

        uid = get_jwt_identity()
        card = addFlashcard(front, back, uid, cardgroupid)
        print("the card added", card)
        # return jsonify(card)
        return jsonify(card)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

@flashcardBlueprint.route("/api/currentuser/flashcards/<cid>", methods=["PUT"])
@jwt_required
def flashcards_edit(cid):
    sleep(DELAY_S)
    try:
        userId = get_jwt_identity()
        cardId = int(cid)
        if getFlashcard(cardId).user.id != userId:
            raise Exception("Error. Can not edit other users flashcards")
        

        newFront = request.json["front"]
        newBack = request.json["back"]
        flashcard = editFlashcard(cardId, newFront, newBack)       

        return jsonify(flashcard)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

@flashcardBlueprint.route("/api/currentuser/flashcards/<cid>", methods=["DELETE"])
@jwt_required
def flashcard_delete(cid):
    sleep(DELAY_S)
    cardId = int(cid)
    
    print(cid, "is deleted yes")
    try:
        userId = get_jwt_identity()

        print(userId)
        print(getFlashcard(cardId).user.id)
        if getFlashcard(cardId).user.id != userId:
            raise Exception("Error. Can not delete other users flashcards")
        deleteFlashcard(cid)
        return jsonify({"success": "true"})
    except Exception as e:
        return jsonify({"error": str(e)})   
        
@flashcardBlueprint.route("/api/admin/cardgroup/<cgid>/deliverystatus", methods=["GET"])
@jwt_required
@admin_only
def status(cgid):
    sleep(DELAY_S)
    try:
        status = getCardgroupDeliveryStatus(int(cgid))
        return jsonify(status)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

@flashcardBlueprint.route("/api/currentuser/flashcards/cardgroupid=<cgid>", methods=["GET"])
@jwt_required
def cardgroup_user_flashcardscards(cgid):
    sleep(DELAY_S)
    print("her her")
    print(type(cgid), "find this")
    uid = get_jwt_identity()
    try:
        return jsonify(getCardGroupFlashCardsUser(int(cgid), int(uid)))
    except Exception as e:
        return jsonify({"error": str(e)})



##############################################################################

# ## temp
# @flashcardBlueprint.route("/api/initcards", methods=["GET"])
# def init_cards():
#     initCards()
#     return jsonify({"success": "true"})


# # temp, expand
# @flashcardBlueprint.route("/api/flashcards/<cid>/averagerating", methods=["GET"])
# def ratings():
#     calculateCardAverageRating(cid)
#     return jsonify({"ratings": "true"})















