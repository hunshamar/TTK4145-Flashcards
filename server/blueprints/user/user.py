

from db import db
from sqlalchemy import and_
from functools import wraps

# def admin_required(f):
#     @wraps(f)
#     def wrap(*args, **kwargs):
#         print(current_user)
#         if not current_user:
#             return jsonify({error: "error with admin elns"})

#         for r in current_user:
#             print("role", r.name)

#         if "Admin" in current_user: 
#             return f(*args, **kwargs)
#         else:
#             flash("You need to be an admin to view this page.")
#             return jsonify({error: "error with admin elns"})
#     return wrap



class UserRoles(db.Model):
    __tablename__ = "user_roles"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id', ondelete='CASCADE'))
    role_id = db.Column(db.Integer(), db.ForeignKey('roles.id', ondelete='CASCADE'))


class Role(db.Model):
    __tablename__ = "roles"
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), unique=True)

    def to_dict(self):
        return{
            "name": self.name
        }

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key = True) # primary_key makes it so that this value is unique and can be used to identify this record.
    username = db.Column(db.String(24), unique=True)
    email = db.Column(db.String(64), unique=True)
    name = db.Column(db.String(64))

    active = db.Column('is_active', db.Boolean(), nullable=False, server_default='1')

    roles = db.relationship('Role', secondary='user_roles')

    def is_admin(self):

        roles = [x.name for x in self.roles]
        print(roles)

        return "Admin" in roles

    def to_dict(self):
        return {
            "id": self.id, 
            "username": self.username,
            "email": self.email,
            "name": self.name,
            "roles": [x.name for x in self.roles ]
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

def makeAdmin(id):
    # id = getUserId(email, username)
    user = getUser(id)
    user.roles.append(Role(name='Admin'))        
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
    if (len(user_list) == 0):
        return False
    return True

def getUserId(email, username):
    if not userRegistred(email, username):
        return False
    else:
        return User.query.filter_by(email=email, username=username).first().id

def getAllUsers():
    users = User.query.all()
    return [i.to_dict() for i in users]

def getUser(uid):
    if not uid:
        raise Exception("User id parameter missing")
    user = User.query.get(uid)
    if not user:
        raise Exception(f"user with id {uid} not found")
    return user


