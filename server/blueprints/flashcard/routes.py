
from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from .flashcard import *

flashcardBlueprint = Blueprint("flashcard", __name__)

@flashcardBlueprint.route("/api/flashcards")
def flashcards():    
    return jsonify(getAllFlashcards())

@flashcardBlueprint.route("/api/flashcard/<cid>")
def flashcard(cid):    
    try:
        return jsonify(getFlashcard(cid).to_dict())
    except Exception as e:
        return jsonify({"error": str(e)})

@flashcardBlueprint.route("/api/editflashcard", methods=["GET", "POST"])
# @jwt_required
def edit_flashcard():
    try: 
        newFront = request.json["front"]
        newBack = request.json["back"]
        cardId = request.json["id"]

        flashcard = editFlashcard(cardId, newFront, newBack)       

        return jsonify(flashcard)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@flashcardBlueprint.route("/api/addFlashcard", methods=["POST"])
@jwt_required
def add_Flashcard():
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
    print(cid, "is deleted yes")
    try:
        deleteFlashcard(cid)
        return jsonify({"success": "true"})
    except Exception as e:
        return jsonify({"error": str(e)})

@flashcardBlueprint.route("/api/cardgroupflashcards/<cgid>", methods=["GET"])
# @jwt_required
def cardgroup_cards(cgid):
    print(type(cgid), "find this")
    try:
        return jsonify(getCardgroupFlashcards(int(cgid)))
    except Exception as e:
        return jsonify({"error": str(e)})



@flashcardBlueprint.route("/api/deletegroup/<cgid>", methods=["DELETE"])
@jwt_required
def delete_group(cgid):
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





