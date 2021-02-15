

from db import db


class User(db.Model):
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
    try:
        user = User(username, email, name)
        db.session.add(user)
        db.session.commit()
        return user.to_dict
    except Exception as e:
        print(e)
        return e   
    
def usernameRegistred(username):
    users = User.query.all()
    user = list(filter(lambda x: x.username == username, users))
    if len(user) >= 1:
        return True 
    else:
        return False

def emailRegistred(email):
    users = User.query.all()
    user = list(filter(lambda x: x.email == email, users))
    if len(user) >= 1:
        return True 
    else:
        return False

def userRegistred(email, username):
    users = User.query.all()
    user = list(filter(lambda x: x.email == email and x.username == username, users))

    if len(user) == 1:
        raise True
    else:
        return False
        



def getAllUsers():
    users = User.query.all()
    return [i.to_dict() for i in users]

def getUser(uid):

    # check type, uid must be int

    users = User.query.all()
    print("getting user with id", uid)
    print(users[0].id, uid)
    user = list(filter(lambda x: x.id == uid, users))[0]
    # print(user)
    return user.to_dict()

