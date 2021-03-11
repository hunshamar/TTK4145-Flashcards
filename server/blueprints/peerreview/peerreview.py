
from db import db
import datetime
from flask import jsonify

# import parents
# from ..flashcard.flashcard import Flashcard, getFlashcard
# from ..user.user import User, getUser

from ..cardgroup.cardgroup import Cardgroup
from ..user.user import User

class Peerreview(db.Model):
    __tablename__ = "peerreview"

    #member variables

    id = db.Column(db.Integer, primary_key=True)

    due_date = db.Column(db.DateTime)
    reviews_per_student = db.Column(db.Integer)

    # parent
    cardgroup_id = db.Column(db.Integer, db.ForeignKey("cardgroup.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    # children
      # 20 cards
    
    flashcard_ids = db.Column(db.ARRAY(db.Integer)

    

    def to_dict(self):            
        return {
            "id": self.id, 
            "dueDate": self.due_date.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "reviewsPerStudent": self.reviews_per_student,
            "cardgroupId": self.cardgroup_id
        }

    ## constructor, add 20 random cards from cardgroup for each student
    def __init__(self, cardgroup, user, due_date, reviews_per_student):
        print(f"Creating peer review for '{cardgroup.title}' for user '{user.username}'")
        self.gardgroup_id = cardgroup.id
        self.user_id = user.id
        self.due_date = due_date
        self.reviews_per_student = reviews_per_student
        self.flashcard_ids = cardgroup.get_n_random_card_ids(reviews_per_student)


def addPeerReview(cardgroup_id, user_id, due_date, reviews_per_student): 

    user = User.query.get(user_id)
    cardgroup = Cardgroup.query.get(cardgroup_id)  
    peerreview = Peerreview(cardgroup, user, due_date, reviews_per_student)
    db.session.add(peerreview)
    db.session.commit()

def r_20_cards():
    peer = Peerreview.query.get(2)

    group = Cardgroup.query.get(peer.cardgroup_id)

    cards = group.get_n_random_card_ids(3)

    # for i in cards:
    #     print(i.to_dict())

    return cards
    # return jsonify({"succ": "my_balls"})