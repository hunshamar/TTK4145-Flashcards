
from db import db
import datetime

# import parents
# from ..flashcard.flashcard import Flashcard, getFlashcard
# from ..user.user import User, getUser

class Peerreview(db.Model):
    __tablename__ = "peerreview"

    #member variables

    id = db.Column(db.Integer, primary_key=True)


    # parent
    # user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    # card_id = db.Column(db.Integer, db.ForeignKey("flashcard.id"))

    cardgroup = relationship("Cardgroup", back_populates="peerreview")


    def to_dict(self):            
        return {
            "id": self.id, 
            "difficulty": self.difficulty,
            "quality_rating": self.quality_rating,
            "savedatestring": self.savedatestring,
            "card_id": self.card_id,
            "user_id": self.user_id,
        }
    # Constructor
    # def __init__(self, difficulty, quality_rating, card, user):
    #     print(f"Creating rating difficulty '{difficulty}' quality '{quality_rating}' card: '{card.id} by user {user.username}")
    #     self.difficulty = difficulty
    #     self.quality_rating = quality_rating
    #     self.card = card
    #     self.user = user
    #     self.savedatestring = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def addRating(user_id, flashcard_id, difficulty, quality_rating):
    if not(user_id, flashcard_id and difficulty and quality_rating):
        raise Exception("Missing parameter for addRating function")

    if (difficulty < 1 or difficulty > 10) or (quality_rating < 1 or quality_rating > 10):
        raise Exception("Error: Rating must be between 1 and 10")

    else:
        flashcard = getFlashcard(flashcard_id)
        user = getUser(user_id)

        
        rating = getRating(user_id, flashcard_id)        
        if rating:
            rating.difficulty = difficulty
            rating.quality_rating = quality_rating
            rating.savedatestring = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        else:
            rating = Cardrating(difficulty=difficulty, quality_rating=quality_rating, flashcard=flashcard, user=user)
            rating.savedatestring = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            db.session.add(rating)

        
        db.session.commit()              

        return rating.to_dict()

def getRating(user_id, flashcard_id):
    rating = Cardrating.query.filter_by(card_id=flashcard_id, user_id=user_id).first()
    print(rating)
    return rating


def getAllRatings():
    ratings = Cardrating.query.all()
    if not ratings:
        raise Exception("Error finding ratings. No ratings")
    return [i.to_dict() for i in ratings]

            
def deleteCardRatings(cid):

    ratings = Cardrating.query.filter_by(card_id=cid).all()    
    for rating in ratings:
        db.session.delete(rating)
    db.session.commit()


    