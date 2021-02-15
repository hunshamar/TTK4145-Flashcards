
from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from db import db
import datetime
from ..user.user import User, getUser


class Cardgroup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256))
    due_date = db.Column(db.DateTime)
    number_of_cards_due = db.Column(db.Integer)

    def to_dict(self):
        return{
            "id": self.id, 
            "title": self.title,
            "dueDate": {
                "year": self.due_date.year,
                "month": self.due_date.month,
                "date": self.due_date.day,
                "hour": self.due_date.hour,
                "minute": self.due_date.minute,
                "second": self.due_date.second
            },
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
    return [i.to_dict() for i in cardgroups]


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
        return cardgroup.to_dict()
    else: 
        raise Exception("Error adding cardgroup function")

def getCardgroup(cdid):
    if (not cdid):
        raise Exception("No group id")
    cdid = int(cdid) # make sure int
    cardgroups = Cardgroup.query.all()
    found_cardgroup_list = list(filter(lambda x: x.id == cdid, cardgroups))
    if not found_cardgroup_list:
        raise Exception("Error finding cardgroup. Id not found")
    if len(found_cardgroup_list) > 1:
        raise Exception("Error finding cardgroup. Multiple cardgroups with same id")
    return found_cardgroup_list[0].to_dict()

def delCardgroup(cdid):
    cardgroup = Cardgroup.query.get(cdid)
    if not cardgroup:
        raise Exception("Error. Could not find cardgroup to delete")

    db.session.delete(cardgroup)
    db.session.commit()
    return True







