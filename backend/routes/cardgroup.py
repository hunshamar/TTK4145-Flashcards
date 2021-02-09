
from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from db import db
import datetime
from .user import User, getUser

cardgroupBlueprint = Blueprint("cardgroup", __name__)

class Cardgroup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256))
    due_date = db.Column(db.Date)
    number_of_cards_due = db.Column(db.Integer)

    def to_json(self):
        return{
            "id": self.id,
            "title": self.title,
            "dueDate": self.due_date,
            "numberOfCardsDue": self.number_of_cards_due
        }

    # Constructor
    def __init__(self, title, due_date, number_of_cards_due):

        print(f"creating cardgroup with title: '{title}' due {due_date} with #cards {number_of_cards_due}")
        self.title = title
        self.due_date = due_date
        self.number_of_cards_due = number_of_cards_due



def getAllCardgroups():
    cardgroups = Cardgroup.query.all()
    if not cardgroups:
        raise Exception("Error finding cardgroups function. No cardgroups")
    return [i.to_json() for i in cardgroups]


def addCardgroup(title, due_date, number_of_cards_due):
    ## todo add verification
      
    if (title and due_date and number_of_cards_due):        
        if (len(title) < 3):
            raise Exception("Title must be longer than 2 characters") 
        if due_date < datetime.datetime.today():
            raise Exception("Due date can not be in the past")
        if int(number_of_cards_due) < 1:
            raise Exception("Number of cards due must be larger than 1")

        cardgroup = Cardgroup(title, due_date, number_of_cards_due)
        db.session.add(cardgroup)
        db.session.commit()
        return cardgroup
    else: 
        raise Exception("Error adding cardgroup function")

def getCardgroup(cdid):
    try: 
        cdid = int(cdid) # make sure int
        cardgroups = Cardgroup.query.all()
        found_cardgroup_list = list(filter(lambda x: x.id == cdid, cardgroups))
        if not found_cardgroup_list:
            raise Exception("Error finding cardgroup. Id not found")
        if len(found_cardgroup_list) >= 1:
            raise Exception("Error finding cardgroup. Multiple cardgroups with same id")
        return found_cardgroup_list[0].to_json()
    except Exception as e:
        return e

def delCardgroup(cdid):
    cardgroup = Cardgroup.query.get(cdid)
    if not cardgroup:
        raise Exception("Error. Could not find cardgroup to delete")

    db.session.delete(cardgroup)
    db.session.commit()
    return True



@cardgroupBlueprint.route("/api/cardgroups")
def cardgroups():    
    try:
        return jsonify(getAllCardgroups())
    except Exception as e:
        return jsonify({"error": str(e)})



@cardgroupBlueprint.route("/api/cardgroup/<cgid>", methods=["GET"])
def cardgroup(cgid):    
    try:
        return jsonify(getCardgroup(cgid))
    except Exception as e:
        return jsonify({"error": str(e)})


@cardgroupBlueprint.route("/api/addcardgroup", methods=["POST"])
@jwt_required
def add_cardgroup():

    print("title og greier:")
    print(request.json["dueDate"])

    try:
        title = request.json["title"]
        print(title)
        number_of_cards_due = request.json["numberOfCardsDue"]
        print(number_of_cards_due)
        due_date = request.json["dueDate"]
        
        print("year:", due_date["year"])
        print("month:", due_date["month"])
        print("day:", due_date)
        due_date = datetime.datetime(int(due_date["year"]),int(due_date["month"]),int(due_date["date"]), 23, 59, 59)
        # due_date = datetime.date(2020,3,4)

        print("real due date")
        print(due_date)

        if not (title or number_of_cards_due or due_date):
            return jsonify({"error": "Invalid form"})

        cardgroup = addCardgroup(title, due_date, number_of_cards_due)
        print("added?")
        print("was it addded", jsonify(cardgroup.to_json()))
        return jsonify(cardgroup.to_json())
    except Exception as e:
        print("error...")
        print(e)
        return jsonify({"error": str(e)})




