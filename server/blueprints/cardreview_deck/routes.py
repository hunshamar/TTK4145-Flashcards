


from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from .cardreview_deck import *


cardreviewDeckBlueprint = Blueprint("cardreview_deck", __name__)


@cardreviewDeckBlueprint.route("/api/currentuser/cardreviewdeck", methods=["GET"])
@jwt_required
def cardreviews_deck_user():

    # user_id = get_jwt_identity()
    user_id = 1

    return jsonify(get_user_cardreview_deck(int(user_id)))


    
    
