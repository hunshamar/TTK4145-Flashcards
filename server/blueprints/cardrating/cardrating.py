
from db import db
import datetime

# import parents
from ..flashcard.flashcard import Flashcard, getFlashcard
from ..user.user import User, getUser
from ..peerreview.peerreview import Peerreview



class Cardrating(db.Model):
    __tablename__ = "cardrating"
    #member variables
    id = db.Column(db.Integer, primary_key=True)
    difficulty = db.Column(db.Integer)
    quality_rating = db.Column(db.Integer)
    savedatestring = db.Column(db.String(128))
    duplicate_card_ids = db.Column(db.String(1028)) # json array of card duplicates ids


    # parent
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    card_id = db.Column(db.Integer, db.ForeignKey("flashcard.id"))
    peerreview_id = db.Column(db.Integer, db.ForeignKey("peerreview.id"))



    def to_dict(self):         
        
        if self.duplicate_card_ids:
            duplicates = [int(id) for id in self.duplicate_card_ids.split(",")]
        else:
            duplicates = []

        return {
            "id": self.id, 
            "difficulty": self.difficulty,
            "quality_rating": self.quality_rating,
            "savedatestring": self.savedatestring,
            "duplicates": duplicates,
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

def addRating(user_id, flashcard_id, difficulty, quality_rating, duplicate_card_ids):



    flashcard = getFlashcard(flashcard_id)
    peerreview = Peerreview.query.filter_by(cardgroup_id=flashcard.cardgroup_id, user_id=user_id).first()

    current_gmt_time = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None)
    if current_gmt_time > peerreview.due_date:
        raise Exception("Error. Due date for rating exceeded")

    if not duplicate_card_ids:
        duplicate_card_ids = None

    if not(user_id, flashcard_id and difficulty and quality_rating):
        raise Exception("Missing parameter for addRating function")       

    if (difficulty < 1 or difficulty > 10) or (quality_rating < 1 or quality_rating > 10):
        raise Exception("Error: Rating must be between 1 and 10")   

    else:
        
        user = getUser(user_id)

        
        rating = getRating(user_id, flashcard_id)      
        if rating:
            rating.difficulty = difficulty
            rating.quality_rating = quality_rating
            rating.savedatestring = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            rating.duplicate_card_ids = duplicate_card_ids
            # rating.card_duplicates.clear()

        else:
            # print(peerreview.to_dict())
            print("no rating")

            rating = Cardrating(difficulty=difficulty, quality_rating=quality_rating, flashcard=flashcard, user=user, duplicate_card_ids=duplicate_card_ids)
            # rating.card_duplicates.append(duplicate)
            # rating.card_duplicates.clear()

            rating.peerreview_id = peerreview.id
            # rating.card_duplicates = mylist
            rating.savedatestring = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            db.session.add(rating)
 
        db.session.commit()              

        return rating.to_dict()

def getRating(user_id, flashcard_id):
    print(f"user_id {user_id} flashcard_id {flashcard_id}")
    rating = Cardrating.query.filter_by(card_id=flashcard_id, user_id=user_id).first()
    print("get reting", rating)
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

def deleteAllCardRatings():
    ratings=Cardrating.query.all()
    for r in ratings:
        db.session.delete(r)
    db.session.commit()

    