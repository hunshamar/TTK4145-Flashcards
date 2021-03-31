


from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from .cardreview import *


cardreviewBlueprint = Blueprint("cardreview", __name__)


@cardreviewBlueprint.route("/api/cardreviews", methods=["GET"])
# @jwt_required
def cardreviews_get_all():
    return jsonify(get_all_cardreviews())


    
    
