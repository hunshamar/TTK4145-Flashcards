
from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from db import db
from .user import User, getUser
from .cardgroup import Cardgroup, getCardgroup, delCardgroup

flashcardBlueprint = Blueprint("flashcard", __name__)

class Flashcard(db.Model):
    #member variables
    id = db.Column(db.Integer, primary_key=True)
    front = db.Column(db.String(2048))
    back = db.Column(db.String(2048))

    # dependencies
    userid = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship('User', foreign_keys=userid)
    
    cardgroupid = db.Column(db.Integer, db.ForeignKey("cardgroup.id"))
    cardgroup = db.relationship('Cardgroup', foreign_keys=cardgroupid)
    

    def to_json(self):
        return {
            "id": self.id, 
            "front": self.front,
            "front": self.back,
            "user": getUser(self.userid),
            "cardgroup": getCardgroup(self.cardgroupid)
        }
    # Constructor
    def __init__(self, front, back, user, cardgroup):
        self.front = front
        self.back = back
        self.user = user
        self.cardgroup = cardgroup

def getAllFlashcards():
    flashcards = Flashcard.query.all()
    return [{"id": i.id, "front": i.front, "back": i.back, "user": getUser(i.userid), "cardgroup": getCardgroup(i.cardgroupid)} for i in flashcards]

def getUserFlashcards():
    flashcards = Flashcard.querry.all()
    return [{"id": i.id, "front": i.front, "back": i.back, "user": getUser(i.userid), "cardgroup": getCardgroup(i.cardgroupid)} for i in filter(lambda i: i.user_id == uid, flashcards)]

def addFlashcard(front, back, userid, cardgroupid):
    if (front and back and userid and cardgroupid):
        try:
            print("can we find user with uid", userid)
            user = list(filter(lambda i: i.id == userid, User.query.all()))[0]
            print(user)

            print("can we find cardgroup with id", cardgroupid)
            cardgroup = list(filter(lambda i: i.id == cardgroupid, Cardgroup.query.all()))[0]
            
            flashcard = Flashcard(front=front, back=back, user=user, cardgroup=cardgroup)

            print(flashcard)
            db.session.add(flashcard)
            db.session.commit()
            return flashcard
        except Exception as e:
            print(e)
            return False
    else:
        return False
        
def getCardgroupCards(cgip):
    flashcards = Flashcard.query.all()
    return [{"id": i.id, "front": i.front, "back": i.back, "user": getUser(i.userid), "cardgroup": getCardgroup(i.cardgroupid)} for i in filter(lambda x: x.cardgroup.id == cgip, flashcards)] #filter(lambda i: i.cardgroup.id == cgip, flashcards)]
    # return({"fml": "fml"})



@flashcardBlueprint.route("/api/flashcards")
def flashcards():

    
    return jsonify(getAllFlashcards())




@flashcardBlueprint.route("/api/addFlashcard", methods=["POST"])
@jwt_required
def add_Flashcard():
    print(request.json)

    try:
        front = request.json["front"]
        back = request.json["back"]
        cardgroupid = request.json["cardgroupid"]
        if not (front and back):
            return jsonify({"error": "Invalid form"})

        uid = get_jwt_identity()
        card = addFlashcard(front, back, uid, cardgroupid)
        print("was it addded", jsonify(card.to_json()))
        # return jsonify(card)
        return jsonify(card.to_json())
    except Exception as e:
        print(e)
        return jsonify({"error": "Invalid form"})

def delCard(cid):
    try:
        card = Flashcard.query.get(cid)
        db.session.delete(card)
        db.session.commit()
        return True
    except Exception as e:
        print(e)
        return False

@flashcardBlueprint.route("/api/deleteflashcard/<cid>", methods=["DELETE"])
@jwt_required
def delete_card(cid):
    print(cid, "is deleted yes")
    try:
        delCard(cid)
        return jsonify({"success": "true"})
    except:
        return jsonify({"error": "Invalid form"})

@flashcardBlueprint.route("/api/cardgroupflashcards/<cgid>", methods=["GET"])
# @jwt_required
def cardgroup_cards(cgid):
    print(type(cgid), "find this")
    try:
        return jsonify(getCardgroupCards(int(cgid)))
    except:
        return jsonify({"error": "Invalid form"})



@flashcardBlueprint.route("/api/deletegroup/<cgid>", methods=["DELETE"])
@jwt_required
def delete_group(cgid):
    print(cgid, "is deleted yes")
    # return jsonify({"error": "here"})
    try:   
        cards = getCardgroupCards(int(cgid))
        print("len", len(cards))

        for card in cards:
            print("card", card["id"])
            delCard(card["id"])
        delCardgroup(cgid)
        return jsonify({"success": "deleted all cards and groups"})
    except:
        print("errr")
        return jsonify({"error": "Invalid form"})



# @flashcardBlueprint.route("/api/deletegroup/<cgid>", methods=["DELETE"])
# @jwt_required
# def delete_group(cgid):
#     print("deleting the group")
#     return jsonify({"error": "here"})
#     try:   
#         cards = getCardgroupCards(cgid)
#         for card in cards:
#             delCard(card.id)
#         delCardgroup(cgid)

#         return jsonify({"success": "deleted all cards and groups"})
#     except:
#         return jsonify({"error": "Invalid form"})

