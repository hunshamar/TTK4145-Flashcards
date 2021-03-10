from db import db

#import parents
from ..user.user import User 
from ..cardgroup.cardgroup import Cardgroup


class Flashcard(db.Model):
    __tablename__ = "flashcard"
    #member variables
    id = db.Column(db.Integer, primary_key=True)
    front = db.Column(db.String(2048))
    back = db.Column(db.String(2048))

    # children
    ratings = db.relationship("Cardrating", cascade="all, delete-orphan", backref="flashcard")

    # Parents
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    cardgroup_id = db.Column(db.Integer, db.ForeignKey("cardgroup.id"))


    def to_dict(self):            
        return {
            "id": self.id, 
            "front": self.front,
            "back": self.back,
            "user": self.user_id,
            "cardgroup": self.cardgroup_id,
        }
    # Constructor
    # def __init__(self, front, back, user, cardgroup):
    #     print(f"Creating flashcard front '{front}' back '{back}' user '{user.to_dict()}' cardgroup '{cardgroup.to_dict()}'")
    #     self.front = front
    #     self.back = back
    #     self.user = user
    #     self.cardgroup = cardgroup

def getAllFlashcards():
    flashcards = Flashcard.query.all()
    return [i.to_dict() for i in flashcards]

def getFlashcard(cid):
    if (not cid):
        raise Exception("No card id")
    cid = int(cid) # make sure int
    flashcard = Flashcard.query.get(cid)
    if (not flashcard):
        raise Exception(f"Card with id {cid} not found")
    return Flashcard.query.get(cid)


# def getUserFlashcards():
#     flashcards = Flashcard.querry.all()
#     return [i.to_dict() for i in filter(lambda i: i.user_id == uid, flashcards)]

def addFlashcard(front, back, userid, cardgroupid):
    if (front and back and userid and cardgroupid):
        user = User.query.get(userid)
        if (not user):
            raise Exception(f"Error. User with id {userid} not found")

        cardgroup = Cardgroup.query.get(cardgroupid)
        if (not cardgroup):
            raise Exception(f"Error. cardgroup with id {cardgroupid} not found")

        # Number of flashcards already added
        numberOfFlashcardsAlreadyAdded = len(getCardGroupFlashCardsUser(cardgroupid, userid))
        print("num", numberOfFlashcardsAlreadyAdded)

        if numberOfFlashcardsAlreadyAdded+1 > cardgroup.number_of_cards_due:
            raise Exception("Error. All cards delivered")



        flashcard = Flashcard(front=front, back=back, user=user, cardgroup=cardgroup)
        db.session.add(flashcard)
        db.session.commit()
        return flashcard.to_dict()
    else:
        raise Exception("Error. Invalid form for adding flashcard")
        
def getCardgroupFlashcards(cgid):
    cards = Flashcard.query.filter_by(cardgroup_id=cgid)
    if (not cards):
        raise Exception(f"cards from cardgroup not found")
    return [i.to_dict() for i in cards]

def deleteFlashcard(cid):
    card = Flashcard.query.get(cid)
    db.session.delete(card)
    db.session.commit()
    # return card.to_dict()

def getCardGroupFlashCardsUser(cgid, uid):
    cards = Flashcard.query.filter_by(cardgroup_id=cgid, user_id=uid)
    if (not cards):
        raise Exception(f"cards from cardgroup not found")
    return [i.to_dict() for i in cards]

def getCardgroupDeliveryStatus(cgid):
    #add error stuff
    users = User.query.all()
    cardgroup = getCardgroup(cgid)
    statusDicts = []    
    for user in users:
        statusDicts.append({
            "user": user.to_dict(),
            "cardgroup": cardgroup.to_dict(),
            "delivered": len(getCardGroupFlashCardsUser(cgid, user.id)),
        })

    return statusDicts


def editFlashcard(cardId, newFront, newBack):
    flashcard = getFlashcard(cardId)
    flashcard.front = newFront
    flashcard.back = newBack
    db.session.commit()
    return flashcard.to_dict()



