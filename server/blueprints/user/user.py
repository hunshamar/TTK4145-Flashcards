

from db import db
from sqlalchemy import and_


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key = True) # primary_key makes it so that this value is unique and can be used to identify this record.
    username = db.Column(db.String(24), unique=True)
    email = db.Column(db.String(64))
    name = db.Column(db.String(64))

    def to_dict(self):
        return {
            "id": self.id, 
            "username": self.username,
            "email": self.email,
            "name": self.name
        }

    # Constructor
    def __init__(self, username, email, name):
        self.username = username
        self.email = email
        self.name = name

def addUser(username, email, name):
    user = User(username, email, name)
    db.session.add(user)
    db.session.commit()
    return user.to_dict
  
    
def usernameRegistred(username):
    user = User.query.filter_by(username = username).all()
    return user

def emailRegistred(email):
    email = User.query.filter_by(email = email).all()
    return email

def userRegistred(email, username):    
    user_list = User.query.filter_by(email=email, username=username).all()
    if (len(user_list) > 1):
        raise Exception("Error. Multiple users registered with email and username")
    return user_list

def getAllUsers():
    users = User.query.all()
    return [i.to_dict() for i in users]

def getUser(uid):
    if not uid:
        raise Exception("User id parameter missing")
    user = User.query.get(uid)
    print("usaarr found?")
    print(user)
    if not user:
        raise Exception(f"user with id {uid} not found")
    return user


