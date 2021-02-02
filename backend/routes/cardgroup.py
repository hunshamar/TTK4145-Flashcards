
from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from db import db
from .user import User, getUser

cardgroupBlueprint = Blueprint("cardgroup", __name__)

class Cardgroup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256))

    def to_json(self):
        return{
            "id": self.id,
            "title": self.title
        }

    # Constructor
    def __init__(self, title):
        self.title = title



def getAllCardgroups():
    cardgroups = Cardgroup.query.all()
    return [{"id": i.id, "title": i.title} for i in cardgroups]

# def getCardgroupFlashcards():
#     flashcards = Flashcard.querry.all()
#     return [{"id": i.id, "userid": i.user_id, "title": i.title, "content": i.content} for i in filter(lambda i: i.user_id == uid, flashcards)]

def addCardgroup(title):
    if (title):
        try:            
            cardgroup = Cardgroup(title)

            print(cardgroup)
            db.session.add(cardgroup)
            db.session.commit()
            return cardgroup
        except Exception as e:
            print(e)
            return False   
    else:
        return False

def getCardgroup(cdid):

    # check type, uid must be int

    cardgroups = Cardgroup.query.all()
    cardgroup = list(filter(lambda x: x.id == cdid, cardgroups))[0]
    # print(user)
    return {"id": cardgroup.id, "title": cardgroup.title}


@cardgroupBlueprint.route("/api/cardgroups")
def cardgroups():    
    return jsonify(getAllCardgroups())


@cardgroupBlueprint.route("/api/addcardgroup", methods=["POST"])
@jwt_required
def add_cardgroup():
    try:
        title = request.json["title"]
        if not title:
            return jsonify({"error": "Invalid form"})

        cardgroup = addCardgroup(title)
        print("was it addded", jsonify(cardgroup.to_json()))
        return jsonify(cardgroup.to_json())
    except Exception as e:
        print(e)
        return jsonify({"error": "Invalid form"})

def delCardgroup(cdid):
    try:
        cardgroup = Cardgroup.query.get(cdid)
        db.session.delete(cardgroup)
        db.session.commit()
        return True
    except Exception as e:
        print(e)
        return False

# @cardgroupBlueprint.route("/api/deletecardgroup/<cid>", methods=["DELETE"])
# @jwt_required
# def delete_cardgroup(cdid):
#     print(cdid, "is deleted yes")
#     try:
#         delCardgroup(cdid)
#         return jsonify({"success": "true"})
#     except:
#         return jsonify({"error": "Invalid form"})

