
from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from .flashcard import *

flashcardBlueprint = Blueprint("flashcard", __name__)
from ..user.routes import admin_only

from time import sleep
from ..values import DELAY_S
@flashcardBlueprint.route("/api/flashcards")
def flashcards():    
    sleep(DELAY_S)
    return jsonify(getAllFlashcards())

@flashcardBlueprint.route("/api/flashcard/<cid>")
def flashcard(cid):    
    sleep(DELAY_S)
    try:
        return jsonify(getFlashcard(cid).to_dict())
    except Exception as e:
        return jsonify({"error": str(e)})

@flashcardBlueprint.route("/api/editflashcard", methods=["GET", "POST"])
@jwt_required
def edit_flashcard():
    sleep(DELAY_S)
    try:
        userId = get_jwt_identity()
        cardId = int(request.json["id"])
        if getFlashcard(cardId).user.id != userId:
            raise Exception("Error. Can not edit other users flashcards")
        

        newFront = request.json["front"]
        newBack = request.json["back"]
        cardId = request.json["id"]


        flashcard = editFlashcard(cardId, newFront, newBack)       

        return jsonify(flashcard)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

@flashcardBlueprint.route("/api/deliverystatus/<cgid>", methods=["GET"])
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


@flashcardBlueprint.route("/api/addFlashcard", methods=["POST"])
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


@flashcardBlueprint.route("/api/deleteflashcard/<cid>", methods=["DELETE"])
@jwt_required
def delete_card(cid):
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

@flashcardBlueprint.route("/api/cardgroupflashcards/<cgid>", methods=["GET"])
# @jwt_required
def cardgroup_cards(cgid):
    sleep(DELAY_S)
    print(type(cgid), "find this")
    try:
        return jsonify(getCardgroupFlashcards(int(cgid)))
    except Exception as e:
        return jsonify({"error": str(e)})

@flashcardBlueprint.route("/api/cardgroupuserflashcards/<cgid>/<uid>", methods=["GET"])
@jwt_required
def cardgroup_user_cards(cgid, uid):
    sleep(DELAY_S)
    print(type(cgid), "find this")
    try:
        return jsonify(getCardGroupFlashCardsUser(int(cgid), int(uid)))
    except Exception as e:
        return jsonify({"error": str(e)})




@flashcardBlueprint.route("/api/deletegroup/<cgid>", methods=["DELETE"])
@jwt_required
def delete_group(cgid):
    sleep(DELAY_S)
    print(cgid, "is deleted yes")
    # return jsonify({"error": "here"})
    try:   
        cards = getCardgroupFlashcards(int(cgid))
        print("len", len(cards))

        for card in cards:
            print("card", card["id"])
            deleteFlashcard(card["id"])
        delCardgroup(cgid)
        return jsonify({"success": "deleted all cards and groups"})
    except Exception as e:
        

        print("errr")
        return jsonify({"error": str(e)})





