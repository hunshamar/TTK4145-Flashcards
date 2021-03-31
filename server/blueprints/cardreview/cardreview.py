from db import db
import datetime as datetime



from ..flashcard.flashcard import Flashcard
from ..cardreview_deck.cardreview_deck import CardreviewDeck

class Cardreview(db.Model):
    __tablename__ = "cardreview"

    id = db.Column(db.Integer, primary_key=True)

    flashcard_id = db.Column(db.Integer, db.ForeignKey("flashcard.id"))
    cardreview_deck_id = db.Column(db.Integer, db.ForeignKey("cardreview_deck.id"))

    repetition_number = db.Column(db.Integer) # n
    inter_repetition_interval = db.Column(db.Integer) # I
    easiness_factor = db.Column(db.Float) # ef

    def to_dict(self):
        return {
            "id": self.id,
            "flashcardId": self.flashcard_id,
            "cardreviewDeckId": self.cardreview_deck_id,
            "repetitionNumber": self.repetition_number,
            "easinessFactor": self.easiness_factor,
            "interRepetitionInterval": self.inter_repetition_interval
        }

    def get_flashcard(self):
        return self.flashcard.public_to_dict()

    def SM_2_algorithm(user_grade):
        if user_grade >= 3: # correct response
            if self.repetition_number == 0:
                self.inter_repetition_interval = 1
            elif self.repetition_number == 1:
                self.inter_repetition_interval = 6
            else:
                self.inter_repetition_interval = round(self.inter_repetition_interval * self.easiness_factor)

            self.easiness_factor = self.easiness_factor + (0.1 - (5  - self.repetition_number) * (0.08 + (5 - self.repetition_number) * 0.02))

            if self.easiness_factor < 1.3:
                self.easiness_factor = 1.3

        else: #incorrect repsonse
            self.repetition_number = 0
            self.inter_repetition_interval = 0

    def __init__(self, flashcard_id):
        self.flashcard_id = flashcard_id,
        self.repetition_number = 0
        self.easiness_factor = 2.5
        self.inter_repetition_interval = 0

def add_cardreviews(flashcard_ids, cardreview_deck_id):

    for f_id in flashcard_ids:
        cardreview = Cardreview(self, f_id)
        db.session.add(cardreview)
    
    db.session.commit()

def answer(cardreview_id, user_grade):

    cardreview = Cardreview.query.get(cardreview_id)
    cardreview.SM_2_algorithm(user_grade) ## update when to see next
    db.session.commit()

    return cardreview.to_dict()


def get_all_cardreviews():
    cardreviews = Cardreview.query.all()

    return [c.to_dict() for c in cardreviews]





