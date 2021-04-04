from db import db
import datetime as datetime

# from ..flashcard.flashcard import Flashcard

from ..user.user import User

class CardreviewDeck(db.Model):
    __tablename__ = "cardreview_deck"

    # title = db.Column(db.String(256))
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256))
    cardreviews = db.relationship("Cardreview", cascade="all, delete", backref="cardreview_deck")
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))


    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id": self.user_id,
            "cardreviews": [c.to_dict() for c in self.cardreviews]
        }

    def get_cardreviews(self):
        return [c.to_dict() for c in self.cardreviews]



def create_cardreview_deck(title, user_id):

    cardreview_deck = CardreviewDeck(title=title, user_id=user_id)
    db.session.add(cardreview_deck)
    db.session.commit()
    return cardreview_deck

def get_user_cardreview_deck(user_id):
    cardreview_deck =  CardreviewDeck.query.filter_by(user_id=user_id).all()

    if len(cardreview_deck) > 1:
        raise Exception("More than one cardreview deck found for user")
    if not len(cardreview_deck):
        return create_cardreview_deck(user_id).to_dict()
    else:

        cardreview_deck =  CardreviewDeck.query.filter_by(user_id=user_id).all()    
        return cardreview_deck[0].to_dict()
        

