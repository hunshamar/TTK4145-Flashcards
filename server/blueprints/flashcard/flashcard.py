from db import db

#import parents
from ..user.user import User, add_user
from ..cardgroup.cardgroup import Cardgroup, get_cardgroup
# from  ..collective_deck.collective_deck import get_collective_deck
import datetime
import statistics



class Flashcard(db.Model):
    __tablename__ = "flashcard"
    #member variables
    id = db.Column(db.Integer, primary_key=True)
    front = db.Column(db.String(2048))
    back = db.Column(db.String(2048))


    average_rating = db.Column(db.Float)
    average_difficulty = db.Column(db.Float)

    # children
    ratings = db.relationship("Cardrating", cascade="all, delete-orphan", backref="flashcard")


    # Parents
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    cardgroup_id = db.Column(db.Integer, db.ForeignKey("cardgroup.id"))
    collective_deck_id = db.Column(db.Integer, db.ForeignKey("collective_deck.id"))


    def calculate_average_rating(self):
        
        print("rat on card")
        qr = [rating.quality_rating for rating in self.ratings if rating.is_complete()]
        d = [rating.difficulty for rating in self.ratings if rating.is_complete()]
        
        if len(qr):
            self.average_rating = statistics.mean(qr)

        
        if len(d):
            self.average_difficulty = statistics.mean(d)

        db.session.commit()

    def peerreview_due_date_ended(self):
        return Cardgroup.query.get(self.cardgroup_id).peer_review_due_date_ended()      

    def to_dict(self):        

        if not self.average_rating and self.peerreview_due_date_ended(): 
            self.calculate_average_rating()
        

        n_ratings = len([rating for rating in self.ratings if rating.is_complete()])

        return {
            "id": self.id, 
            "front": self.front,
            "back": self.back,
            "user": User.query.get(self.user_id).to_dict(),
            "cardgroup": self.cardgroup_id,
            "nRatings": n_ratings,
            "averageRating": self.average_rating,
            "averageDifficulty": self.average_difficulty,
            "collectiveDeckId": self.collective_deck_id
        }

    def public_to_dict(self):
        return{
            "id": self.id, 
            "front": self.front,
            "back": self.back,
            "cardgroup": self.cardgroup_id,
        }
    # Constructor
    # def __init__(self, front, back, user, cardgroup):
    #     print(f"Creating flashcard front '{front}' back '{back}' user '{user.to_dict()}' cardgroup '{cardgroup.to_dict()}'")
    #     self.front = front
    #     self.back = back
    #     self.user = user
    #     self.cardgroup = cardgroup

def get_all_flashcards():
    flashcards = Flashcard.query.all()
    return [i.to_dict() for i in flashcards]

def get_flashcard(cid):
    if (not cid):
        raise Exception("No card id")
    cid = int(cid) # make sure int
    flashcard = Flashcard.query.get(cid)
    if (not flashcard):
        raise Exception(f"Card with id {cid} not found")
    return Flashcard.query.get(cid)

def calculate_average_rating():
    for flashcard in Flashcard.query.all():
        flashcard.calculate_average_rating()
    db.session.commit()

# def getUserFlashcards():
#     flashcards = Flashcard.querry.all()
#     return [i.to_dict() for i in filter(lambda i: i.user_id == uid, flashcards)]

def init_cards():
    


    for i in range(8):
        username = "user"+str(i)
        email = "user"+str(i)
        name = "name"+str(i)
        if not len(User.query.filter_by(username=username).all()):
            add_user(username, email, name)
    
    users = User.query.all()
    
    for c in Cardgroup.query.all():
        
        for u in users:
            for i in range(c.number_of_cards_due):
                front = f" for chapter {c.title} this is user with username {u.username}'s question nr {i+1} "
                back = f" for chapter {c.title}  this is user with username {u.username}'s answer nr {i+1} "

                try: 
                    add_flashcard(front, back, u.id, c.id)
                except Exception:
                    pass


def add_flashcard(front, back, userid, cardgroupid):
    if (front and back and userid and cardgroupid):
        user = User.query.get(userid)
        if (not user):
            raise Exception(f"Error. User with id {userid} not found")

        cardgroup = Cardgroup.query.get(cardgroupid)
        if (not cardgroup):
            raise Exception(f"Error. cardgroup with id {cardgroupid} not found")

        # Number of flashcards already added
        number_of_flashcards_already_added = len(get_user_flashcards_from_cardgroup(cardgroupid, userid))
        print("num", number_of_flashcards_already_added)

        if number_of_flashcards_already_added+1 > cardgroup.number_of_cards_due:
            raise Exception("Error. All cards delivered")

        current_gmt_time = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None)
        if current_gmt_time > cardgroup.due_date:
            raise Exception("Error. Due date exceeded")



        flashcard = Flashcard(front=front, back=back, user=user, cardgroup=cardgroup)
        db.session.add(flashcard)
        db.session.commit()
        return flashcard.to_dict()
    else:
        raise Exception("Error. Invalid form for adding flashcard")
        
def get_cardgroup_flashcards(cgid):
    cards = Flashcard.query.filter_by(cardgroup_id=cgid)
    if (not cards):
        raise Exception(f"cards from cardgroup not found")
    return [i.to_dict() for i in cards]

def delete_flashcard(cid):
    flashcard = Flashcard.query.get(cid)

    cardgroup = Cardgroup.query.get(flashcard.cardgroup_id)
    if (not cardgroup):
        raise Exception(f"Error. cardgroup with id {cardgroupid} not found")
    current_gmt_time = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None)
    if current_gmt_time > cardgroup.due_date:
        raise Exception("Error. Due date exceeded")

    db.session.delete(flashcard)
    db.session.commit()
    # return card.to_dict()

def get_user_flashcards_from_cardgroup(cgid, uid):
    cards = Flashcard.query.filter_by(cardgroup_id=cgid, user_id=uid)
    if (not cards):
        raise Exception(f"cards from cardgroup not found")
    return [i.to_dict() for i in cards]

def get_cardgroup_delivery_status(cgid):
    #add error stuff
    users = User.query.all()
    cardgroup = Cardgroup.query.get(cgid)
    status_dicts = []    
    for user in users:
        status_dicts.append({
            "user": user.to_dict(),
            "cardgroup": cardgroup.to_dict(),
            "delivered": len(get_user_flashcards_from_cardgroup(cgid, user.id)),
        })

    return status_dicts


def edit_flashcard(cardId, newFront, newBack):
    flashcard = get_flashcard(cardId)
    cardgroup = Cardgroup.query.get(flashcard.cardgroup_id)
    if (not cardgroup):
        raise Exception(f"Error. cardgroup with id {cardgroupid} not found")
    current_gmt_time = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None)
    if current_gmt_time > cardgroup.due_date:
        raise Exception("Error. Due date exceeded")

    flashcard.front = newFront
    flashcard.back = newBack
    db.session.commit()
    return flashcard.to_dict()



