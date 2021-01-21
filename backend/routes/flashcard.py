
from flask import Blueprint, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from db import db
from .user import User, getUser

flashcardBlueprint = Blueprint("flsahcard", __name__)

class Flashcard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship('User', foreign_keys=uid)
    title = db.Column(db.String(256))
    content = db.Column(db.String(2048))

    # # Constructor
    # def __init__(self, title, content, user):
    #     self.title = title
    #     self.content = content
    #     self.user = user

def getAllFlashcards():
    flashcards = Flashcard.query.all()
    return [{"id": i.id, "title": i.title, "content": i.content, "user": getUser(i.uid)} for i in flashcards]

def getUserFlashcards():
    flashcards = Flashcard.querry.all()
    return [{"id": i.id, "userid": i.user_id, "title": i.title, "content": i.content} for i in filter(lambda i: i.user_id == uid, flashcards)]

def addFlashcard(title, content, uid):
    if (title and content and uid):
        try:
            print("can we find user with uid", uid)
            user = list(filter(lambda i: i.id == uid, User.query.all()))[0]
            
            flashcard = Flashcard(title=title, content=content, user=user)

            print(flashcard)
            db.session.add(flashcard)
            db.session.commit()
            return True
        except Exception as e:
            print(e)
            return False   
    else:
        return False


@flashcardBlueprint.route("/api/flashcards")
def flashcards():
    return jsonify(getAllFlashcards())




@flashcardBlueprint.route("/api/addFlashcard", methods=["POST"])
def add_Flashcard():
    try:
        title = request.json["title"]
        content = request.json["content"]
        uid = request.json["uid"]
        print("was it addded", addFlashcard(title, content, uid))
        return jsonify({"success": "true"})
    except Exception as e:
        print(e)
        return jsonify({"error": "Invalid form"})
