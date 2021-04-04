


from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from .user_flashcard_deck import *


userFlashcardDeckBlueprint = Blueprint("user_flashcard_deck", __name__)


@userFlashcardDeckBlueprint.route("/api/currentuser/user_flashcard_decks", methods=["GET"])
@jwt_required
def user_flashcard_decks_get():

    user_id = get_jwt_identity()

    return jsonify(get_user_flashcard_decks(int(user_id)))

@userFlashcardDeckBlueprint.route("/api/currentuser/user_flashcard_decks", methods=["POST"])
def user_flashcard_decks_post():
    user_id = get_jwt_identity()


    
