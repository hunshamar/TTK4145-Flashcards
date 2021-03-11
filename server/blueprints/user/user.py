

from db import db
from sqlalchemy import and_
from functools import wraps

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key = True) # primary_key makes it so that this value is unique and can be used to identify this record.
    username = db.Column(db.String(24), unique=True)
    email = db.Column(db.String(64), unique=True)
    name = db.Column(db.String(64))
    role = db.Column(db.String(16))

    # active = db.Column('is_active', db.Boolean(), nullable=False, server_default='1')

    # children
    cardratings = db.relationship("Cardrating", cascade="all, delete-orphan", backref="user")
    flashcards =  db.relationship("Flashcard", cascade="all, delete-orphan", backref="user")
    peerreviews = db.relationship("Peerreview", backref="user")

    def is_admin(self):
        return self.role == "Admin"

    def to_dict(self):
        return {
            "id": self.id, 
            "username": self.username,
            "email": self.email,
            "name": self.name,
            "role": self.role
        }

    # Constructor
    def __init__(self, username, email, name):
        self.username = username
        self.email = email
        self.name = name
        self.role = "User"


def addUser(username, email, name):
    user = User(username, email, name)
    db.session.add(user)
    db.session.commit()
    return user.to_dict

def makeAdmin(id):
    # id = getUserId(email, username)
    user = getUser(id)
    user.role = "Admin" 
    print("updated", user.to_dict())
    db.session.commit()
    return user.to_dict()

def removeAdmin(id):
    # id = getUserId(email, username)
    user = getUser(id)
    user.role = "User" 
    print("updated", user.to_dict())
    db.session.commit()
    return user.to_dict()
  
    
def usernameRegistred(username):
    user = User.query.filter_by(username = username).all()
    return user

def emailRegistred(email):
    email = User.query.filter_by(email = email).all()
    return email


def userRegistred(email, username): 
    user_list = User.query.filter_by(email=email, username=username).all()
    print(user_list)
    if (len(user_list) > 1):
        raise Exception("Error. Multiple users registered with email and username")
    if (len(user_list) == 0):
        return False
    return True

def getUserId(email, username):
    if not userRegistred(email, username):
        raise Exception("Could not find user registered with email", email,"and username", username)
    else:
        return User.query.filter_by(email=email, username=username).first().id

def getAllUsers():
    users = User.query.all()
    return [i.to_dict() for i in users]

def getUsersWithRole(role):
    users = User.query.filter_by(role=role)
    return [i.to_dict() for i in users]

def searchUsers(role, phrase):
    if role=="all":
        users = User.query.filter_by(username=phrase)
    else:
        users = User.query.filter_by(role=role, username=phrase)

    return [i.to_dict() for i in users]


def getUser(uid):
    if not uid:
        raise Exception("User id parameter missing")
    user = User.query.get(uid)
    if not user:
        raise Exception(f"user with id {uid} not found")
    return user


