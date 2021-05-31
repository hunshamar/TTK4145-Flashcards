


from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from .user_flashcard_deck import *


userFlashcardDeckBlueprint = Blueprint("user_flashcard_deck", __name__)


@userFlashcardDeckBlueprint.route("/api/currentuser/user-flashcard-decks", methods=["GET"])
@jwt_required
def user_flashcard_decks_get():


    id =  request.args.get("id", False)
    user_id = get_jwt_identity()

    if id:
        print("id", id)
        return jsonify(get_user_flashcard_deck(int(user_id), id))
    else:

        print("no id", id)
        return jsonify(get_user_flashcard_decks(int(user_id)))


@userFlashcardDeckBlueprint.route("/api/currentuser/user-flashcard-decks", methods=["POST"])
@jwt_required
def user_flashcard_decks_post():
    try:

        flashcards = request.json["flashcards"]
        title = request.json["title"]
        number_of_cards = request.json["nCards"]
        user_id = get_jwt_identity()

        d = create_user_flashcard_deck(title, user_id, flashcards, int(number_of_cards))

        return jsonify(d.to_dict())

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@userFlashcardDeckBlueprint.route("/api/currentuser/user-flashcard-decks/<ufdid>", methods=["DELETE"])
@jwt_required
def user_flashcard_decks_delete(ufdid):
    try:

        user_id = get_jwt_identity()

        return jsonify(delete_user_flashcard_deck(user_id, int(ufdid)))


    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

    
@userFlashcardDeckBlueprint.route("/api/currentuser/user-flashcard-decks/<fcdid>/flashcards", methods=["GET"])
@jwt_required
def user_flashcard_decks_flashcards(fcdid):
    try:

        deck_id = int(fcdid)
        user_id = get_jwt_identity()

        deck = get_deck_cards(user_id, deck_id)

        return jsonify(deck)


    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@userFlashcardDeckBlueprint.route("/api/currentuser/user-flashcard-decks/<fcdid>/flashcard/<cid>/answer", methods=["POST"])
@jwt_required
def user_flashcard_decks_flashcard_answer(fcdid, cid):
    try:


        correct = bool(request.json["correct"])
        flashcard_deck_id = int(fcdid)
        card_id = int(cid)
        user_id = get_jwt_identity()

        print(correct, flashcard_deck_id, card_id, user_id)

        updated_deck = answer_review(correct, flashcard_deck_id, card_id, user_id)

        return jsonify(updated_deck)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})