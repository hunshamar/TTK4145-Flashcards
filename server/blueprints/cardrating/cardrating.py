
from db import db
from ..flashcard.flashcard import Flashcard, getFlashcard
from ..user.user import User, getUser
import datetime

class Cardrating(db.Model):
    __tablename__ = "cardrating"
    #member variables
    id = db.Column(db.Integer, primary_key=True)
    difficulty = db.Column(db.Integer)
    quality_rating = db.Column(db.Integer)

    savedatestring = db.Column(db.String(2048))

    # dependencies
    cardid = db.Column(db.Integer, db.ForeignKey("flashcard.id"))
    card = db.relationship('Flashcard', foreign_keys=cardid, lazy='subquery')

    
    userid = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship('User', foreign_keys=userid, lazy='subquery')
    
    def to_dict(self):            
        return {
            "id": self.id, 
            "difficulty": self.difficulty,
            "quality_rating": self.quality_rating,
            "savedatestring": self.savedatestring,
            "card": self.card.to_dict(),
            "user": self.user.to_dict(),
        }
    # Constructor
    def __init__(self, difficulty, quality_rating, card, user):
        print(f"Creating rating difficulty '{difficulty}' quality '{quality_rating}' card: '{card.id} by user {user.username}")
        self.difficulty = difficulty
        self.quality_rating = quality_rating
        self.card = card
        self.user = user
        self.savedatestring = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

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
            rating = Cardrating(difficulty, quality_rating, flashcard, user)
            db.session.add(rating)

        
        db.session.commit()              

        return rating.to_dict()

def getRating(user_id, flashcard_id):

    return Cardrating.query.filter_by(cardid=flashcard_id, userid=user_id).first()


def getAllRatings():
    ratings = Cardrating.query.all()
    if not ratings:
        raise Exception("Error finding ratings. No ratings")
    return [i.to_dict() for i in ratings]

            
def deleteCardRatings(cid):

    ratings = Cardrating.query.filter_by(cardid=cid).all()    
    for rating in ratings:
        db.session.delete(rating)
    db.session.commit()


    