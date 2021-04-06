


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


@collectiveDeckBlueprint.route("/api/collective-deck/flashcards", methods=["GET"])
# @jwt_required
# @admin_only
def collective_deck_get_flashcards():
    try:

        difficulty_min =  request.args.get("difficulty-min", default=0)
        difficulty_max =  request.args.get("difficulty-max", default=10)
        cardgroup_ids = request.args.get("cardgroup-id", default="all")
        n_cards       = request.args.get("ncards", default="all")
        id_only       = request.args.get("id-only", default=False)


        if cardgroup_ids != "all":
            cardgroup_ids = [int(s) for s in cardgroup_ids.split(',')]

        return jsonify(get_random_collective_deck_flashcards(int(difficulty_min), int(difficulty_max), cardgroup_ids, n_cards, id_only))

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


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
    
