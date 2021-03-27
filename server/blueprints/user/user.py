

from db import db
from sqlalchemy import and_
from functools import wraps


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key = True) 
    username = db.Column(db.String(24), unique=True)
    email = db.Column(db.String(64), unique=True)
    name = db.Column(db.String(64))
    role = db.Column(db.String(16))

    # children
    cardratings = db.relationship("Cardrating", backref="user") ## cardratings are not deleted on user delete
    flashcards =  db.relationship("Flashcard",  backref="user") # flashcards are not deleted on user delte
    peerreviews = db.relationship("Peerreview", backref="user") # peerreviews are deleted on user delete, but cardratings are kept. 

    def is_admin(self):
        return self.role == "Admin"

    def to_dict(self):
        return {
            "id": self.id, 
            "username": self.username,
            "email": self.email,
            "name": self.name,
            "role": self.role,
            # "peerreviews": [i.to_dict() for i in self.peerreviews]
        }

    # Constructor
    def __init__(self, username, email, name):
        self.username = username
        self.email = email
        self.name = name
        self.role = "User"


def add_user(username, email, name):
    user = User(username, email, name)
    db.session.add(user)
    db.session.commit()
    return user.to_dict

def make_admin(id):
    user = get_user(id)
    user.role = "Admin" 
    print("updated", user.to_dict())
    db.session.commit()
    return user.to_dict()

def remove_admin(id):
    user = get_user(id)
    user.role = "User" 
    db.session.commit()
    return user.to_dict()
  
    
def username_registered(username):
    user = User.query.filter_by(username = username).all()
    return user

def email_registered(email):
    email = User.query.filter_by(email = email).all()
    return email


def user_registered(email, username): 
    user_list = User.query.filter_by(email=email, username=username).all()
    print(user_list)
    if (len(user_list) > 1):
        raise Exception("Error. Multiple users registered with email and username")
    if (len(user_list) == 0):
        return False
    return True

def get_user_id(email, username):
    if not userRegistred(email, username):
        raise Exception("Could not find user registered with email", email,"and username", username)
    else:
        return User.query.filter_by(email=email, username=username).first().id

def get_all_users():
    users = User.query.all()
    return [i.to_dict() for i in users]

def get_users_with_role(role):
    users = User.query.filter_by(role=role)
    return [i.to_dict() for i in users]

def serach_users(role, phrase):
    if role=="all":
        users = User.query.filter_by(username=phrase)
    else:
        users = User.query.filter_by(role=role, username=phrase)

    return [i.to_dict() for i in users]

def get_user(uid):
    if not uid:
        raise Exception("User id parameter missing")
    user = User.query.get(uid)
    if not user:
        raise Exception(f"user with id {uid} not found")
    return user


