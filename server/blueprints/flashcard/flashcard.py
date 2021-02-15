from db import db
from ..user.user import User, getUser
from ..cardgroup.cardgroup import Cardgroup, getCardgroup, delCardgroup

class Flashcard(db.Model):
    #member variables
    id = db.Column(db.Integer, primary_key=True)
    front = db.Column(db.String(2048))
    back = db.Column(db.String(2048))

    # dependencies
    userid = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship('User', foreign_keys=userid)
    
    cardgroupid = db.Column(db.Integer, db.ForeignKey("cardgroup.id"))
    cardgroup = db.relationship('Cardgroup', foreign_keys=cardgroupid)
    

    def to_dict(self):            
        return {
            "id": self.id, 
            "front": self.front,
            "back": self.back,
            "user": self.user.to_dict(),
            "cardgroup": self.cardgroup.to_dict()
        }
    # Constructor
    def __init__(self, front, back, user, cardgroup):
        print(f"Creating flashcard front '{front}' back '{back}' user '{user.to_dict()}' cardgroup '{cardgroup.to_dict()}'")
        self.front = front
        self.back = back
        self.user = user
        self.cardgroup = cardgroup

def getAllFlashcards():
    flashcards = Flashcard.query.all()
    return [i.to_dict() for i in flashcards]

def getFlashcard(cid):
    if (not cid):
        raise Exception("No card id")
    cid = int(cid) # make sure int
    flashcards = Flashcard.query.all()
    found_flashcard_list = list(filter(lambda x: x.id == cid, flashcards))
    if not found_flashcard_list:
        raise Exception("Error finding card. Id not found")
    if len(found_flashcard_list) > 1:
        raise Exception("Error finding flashcards. Multiple cards with same id")
    return found_flashcard_list[0].to_dict()

# def getUserFlashcards():
#     flashcards = Flashcard.querry.all()
#     return [i.to_dict() for i in filter(lambda i: i.user_id == uid, flashcards)]

def addFlashcard(front, back, userid, cardgroupid):
    if (front and back and userid and cardgroupid):
        user_list = list(filter(lambda i: i.id == userid, User.query.all()))
        if not user_list:
            raise Exception("User not found when adding flashcard")
        user = user_list[0]
        cardgroup_list = list(filter(lambda i: i.id == int(cardgroupid), Cardgroup.query.all()))
        if not cardgroup_list:
            raise Exception("Cardgroup not found when adding flashcard.")
        cardgroup = cardgroup_list[0]

        flashcard = Flashcard(front, back, user, cardgroup)
        db.session.add(flashcard)
        db.session.commit()
        return flashcard.to_dict()
    else:
        raise Exception("Error. Invalid form for adding flashcard")
        
def getCardgroupFlashcards(cgip):
    flashcards = Flashcard.query.all()    
    return [i.to_dict() for i in filter(lambda x: x.cardgroup.id == cgip, flashcards)] 


def deleteFlashcard(cid):
    card = Flashcard.query.get(cid)
    db.session.delete(card)
    db.session.commit()
    return card.to_dict()

def editFlashcard(cardId, newFront, newBack):
    flashcard = getFlashcard(cardId)
    flashcard.front = newFront
    flashcard.back = newBack
    db.session.commit()
    return flashcard.to_dict()



