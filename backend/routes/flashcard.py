
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
        print("user--id", self.user.to_json())
        print("user--id", self.userid)
        print("cardgroupid", self.cardgroupid)
            
        return {
            "id": self.id, 
            "front": self.front,
            "back": self.back,
            "user": self.user.to_json(),
            "cardgroup": self.cardgroup.to_json()
        }
    # Constructor
    def __init__(self, front, back, user, cardgroup):
        print(f"Creating flashcard front '{front}' back '{back}' user '{user.to_json()}' cardgroup '{cardgroup.to_json()}'")
        self.front = front
        self.back = back
        self.user = user
        self.cardgroup = cardgroup

def getAllFlashcards():
    flashcards = Flashcard.query.all()
    return [i.to_json() for i in flashcards]

def getFlashcard(cid):
    if (not cid):
        raise Exception("No card id")
    cid = int(cid) # make sure int
    flashcards = Flashcard.query.all()
    found_flashcard_list = list(filter(lambda x: x.id == cid, flashcards))
    if not found_flashcard_list:
        raise Exception("Error finding card. Id not found")
    if len(found_flashcard_list) > 1:
        raise Exception("Error finding flashcards. Multiple cards with same id")
    return found_flashcard_list[0]

def getUserFlashcards():
    flashcards = Flashcard.querry.all()
    return [i.to_json() for i in filter(lambda i: i.user_id == uid, flashcards)]

def addFlashcard(front, back, userid, cardgroupid):
    if (front and back and userid and cardgroupid):
        print("can we find user with uid", userid)
        user_list = list(filter(lambda i: i.id == userid, User.query.all()))
        if not user_list:
            raise Exception("User not found when adding flashcard")
        user = user_list[0]
        cardgroup_list = list(filter(lambda i: i.id == int(cardgroupid), Cardgroup.query.all()))
        if not cardgroup_list:
            raise Exception("Cardgroup not found when adding flashcard.")
        cardgroup = cardgroup_list[0]

        flashcard = Flashcard(front, back, user, cardgroup)
        db.session.add(flashcard)
        db.session.commit()
        return flashcard
    else:
        raise Exception("Error. Invalid form for adding flashcard")
        
def getCardgroupCards(cgip):
    flashcards = Flashcard.query.all()
    
    return [i.to_json() for i in filter(lambda x: x.cardgroup.id == cgip, flashcards)] 


def delCard(cid):
    card = Flashcard.query.get(cid)
    db.session.delete(card)
    db.session.commit()
    return True



@flashcardBlueprint.route("/api/flashcards")
def flashcards():    
    return jsonify(getAllFlashcards())

@flashcardBlueprint.route("/api/flashcard/<cid>")
def flashcard(cid):    
    try:
        return jsonify(getFlashcard(cid).to_json())
    except Exception as e:
        return jsonify({"error": str(e)})

@flashcardBlueprint.route("/api/editflashcard", methods=["GET", "POST"])
# @jwt_required
def edit_flashcard():
    try: 
        newFront = request.json["front"]
        newBack = request.json["back"]
        cardId = request.json["id"]

        flashcard = getFlashcard(cardId)
        flashcard.front = newFront
        flashcard.back = newBack
        db.session.commit()

        return jsonify(flashcard.to_json())

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
        print("the card added", card.to_json())

        print("was it addded", jsonify(card.to_json()))
        # return jsonify(card)
        return jsonify(card.to_json())
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@flashcardBlueprint.route("/api/deleteflashcard/<cid>", methods=["DELETE"])
@jwt_required
def delete_card(cid):
    print(cid, "is deleted yes")
    try:
        delCard(cid)
        return jsonify({"success": "true"})
    except Exception as e:
        return jsonify({"error": str(e)})

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





