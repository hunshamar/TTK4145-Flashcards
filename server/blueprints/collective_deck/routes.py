


from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from .collective_deck import *
from ..user.routes import admin_only


collectiveDeckBlueprint = Blueprint("collective_deck", __name__)


@collectiveDeckBlueprint.route("/api/collective-deck", methods=["GET"])
@jwt_required
@admin_only
def collective_deck_get():
    return jsonify(get_collective_deck().to_dict())


@collectiveDeckBlueprint.route("/api/admin/collective-deck/flashcards", methods=["POST"])
@jwt_required
@admin_only
def flashcards_add_to_collective_deck():
    try:
        flashcards = request.json["flashcards"]

        return jsonify(add_to_collective_deck(flashcards))

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

@collectiveDeckBlueprint.route("/api/admin/collective-deck/flashcards", methods=["DELETE"])
@jwt_required
@admin_only
def flashcards_remove_from_collective_deck():
    print("hø")
    try:
        flashcards = request.json["flashcards"]
        return jsonify(remove_from_collective_deck(flashcards))

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

@collectiveDeckBlueprint.route("/api/collective-deck/cardgroups", methods=["GET"])
def collective_deck_cardgroups():
    print("hø")
    try:
        return jsonify(get_cardgroups_in_collective_deck())

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


get_cardgroups_in_collective_deck
    
