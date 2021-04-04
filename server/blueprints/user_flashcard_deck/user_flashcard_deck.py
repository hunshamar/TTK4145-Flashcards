from db import db
import datetime as datetime

# from ..flashcard.flashcard import Flashcard

from ..flashcard.flashcard import Flashcard
from ..user.user import User
from ..collective_deck.collective_deck import CollectiveDeck,get_collective_deck

user_flashcard_deck_cards = db.Table('user_flashcard_deck_cards', 
    db.Column('id', db.Integer, primary_key=True),
    db.Column('flashcard_id', db.Integer, db.ForeignKey('flashcard.id')),
    db.Column('user_flashcard_deck_id', db.Integer, db.ForeignKey('user_flashcard_deck.id'))
)

class UserFlashcardDeck(db.Model):
    __tablename__ = "user_flashcard_deck"

    # title = db.Column(db.String(256))
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256))
    flashcards = db.relationship("Flashcard", secondary=user_flashcard_deck_cards, backref="user_flashcard_deck")
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))


    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id": self.user_id,
            "flashcards": [c.to_dict() for c in self.cardreviews]
        }

    def get_flashcards(self):
        return [f.to_dict() for f in self.flashcards]



def create_user_flashcard_deck(title, user_id, flashcards):
    try:
        collective_deck = get_collective_deck()

        got_flashcards = [Flashcard.query.get(f["id"]) for f in flashcards if f.collective_deck_id]
        
        if (len(flashcards != len(got_flashcards))):
            raise Exception("Error. Could not fetch all flashcards from collective deck")

        user_flashcard_deck = UserFlashcardDeck(title=title, user_id=user_id, flashcards=got_flashcards)
        db.session.add(user_flashcard_deck)
        db.session.commit()
        return user_flashcard_deck
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


def get_user_flashcard_decks(uid):
    try:
        user_flashcard_decks = UserFlashcardDeck.query.get(user_id=uid)
        return [u.to_dict() for u in user_flashcard_decks]
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

