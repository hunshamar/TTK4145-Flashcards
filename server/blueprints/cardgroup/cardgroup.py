
from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from db import db
import datetime
import random 

MAX_NUMBER_OF_CARDS = 50

class Cardgroup(db.Model):
    __tablename__ = "cardgroup"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256))
    due_date = db.Column(db.DateTime)
    number_of_cards_due = db.Column(db.Integer)

    # children
    flashcards = db.relationship("Flashcard", cascade="all, delete", backref="cardgroup")


    peerreview = db.relationship("Peerreview", uselist=False, cascade="all, delete-orphan", backref="cardgroup")

    def get_flashcards(self):
        return [f.to_dict() for f in self.flashcards]

    def get_n_random_cards(self, n):
        
        ## temp løsning ?              
        return random.sample(self.flashcards, n)

    def get_cards_from_ids(self, idarr):

        print("idarr", idarr)
        fc = [card for card in self.flashcards if card.id in idarr]
        
        print([f.id for f in fc])


        return fc



    def to_dict(self):

        # for i in self.flashcards:
        #     # d =  i.to_dict()
        #     print(i.to_dict())

        return{
            "id": self.id, 
            "title": self.title,
            "dueDate": self.due_date.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "numberOfCardsDue": self.number_of_cards_due,
            # "flashcards": [i.to_dict() for i in self.flashcards]
        }

    # Constructor
    # def __init__(self, title, due_date, number_of_cards_due):

    #     print(f"creating cardgroup with title: '{title}' due {due_date} with #cards {number_of_cards_due}")
    #     self.title = title
    #     self.due_date = due_date
    #     self.number_of_cards_due = number_of_cards_due



def get_all_cardgroups():
    cardgroups = Cardgroup.query.all()
    if not cardgroups:
        raise Exception("Error finding cardgroups function. No cardgroups")
    return [i.to_dict() for i in cardgroups]

def edit_cardgroup(cardgroup_id, title, due_date, number_of_cards_due):

    current_gmt_time = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None)
      
    if (title and due_date and number_of_cards_due):        
        if (len(title) < 3):
            raise Exception("Title must be longer than 2 characters") 
        if due_date < current_gmt_time: 
            raise Exception("Due date can not be in the past")
        if int(number_of_cards_due) < 1:
            raise Exception("Number of cards due must be larger than 0")

        if int(number_of_cards_due) > MAX_NUMBER_OF_CARDS:
            raise Exception("Number of cards are limited to "+str(MAX_NUMBER_OF_CARDS))

        cardgroup = Cardgroup.query.get(cardgroup_id)
        if not cardgroup:
            raise Exception("Cardgroup with id not found")

        cardgroup.title = title
        cardgroup.due_date = due_date
        cardgroup.number_of_cards_due = number_of_cards_due
    
        db.session.commit()
        
        return cardgroup.to_dict()
    else: 
        raise Exception("Error adding cardgroup function")


def add_cardgroup(title, due_date, number_of_cards_due):

    current_gmt_time = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None)
      
    if (title and due_date and number_of_cards_due):        
        if (len(title) < 3):
            raise Exception("Title must be longer than 2 characters") 
        if due_date < current_gmt_time: 
            raise Exception("Due date can not be in the past")
        if int(number_of_cards_due) < 1:
            raise Exception("Number of cards due must be larger than 0")

        if int(number_of_cards_due) > MAX_NUMBER_OF_CARDS:
            raise Exception("Number of cards are limited to "+str(MAX_NUMBER_OF_CARDS))

        cardgroup = Cardgroup(title=title, due_date=due_date, number_of_cards_due=number_of_cards_due)
        db.session.add(cardgroup)
        db.session.commit()
        return cardgroup.to_dict()
    else: 
        raise Exception("Error adding cardgroup function")

def get_cardgroup(cdid):
    if (not cdid):
        raise Exception("No group id")
    cdid = int(cdid) # make sure int
    cardgroup = Cardgroup.query.get(cdid)
    if (not cardgroup):
        raise Exception(f"Cardgroup with id {cdid} not found")
    return cardgroup

def delete_cardgroup(cdid):
    cardgroup = getCardgroup(cdid)
    db.session.delete(cardgroup)
    db.session.commit()
    return True







