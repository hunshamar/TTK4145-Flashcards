from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from routes import initRoute
from login import loginRoute, loginCallRoute, JSONRoute, usersRoute, getCurrentUserRoute
from db import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

# db = SQLAlchemy()

app = Flask(__name__)
CORS(app)
JWTManager(app)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydb.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "myawesomesecretisnevergonnagiveyouup"
app.secret_key = 'super secret key'


db.init_app(app)

app.register_blueprint(initRoute)
app.register_blueprint(loginRoute)
app.register_blueprint(loginCallRoute)
app.register_blueprint(usersRoute)
app.register_blueprint(JSONRoute)
app.register_blueprint(getCurrentUserRoute)



if __name__ == "__main__":
    app.run(debug=True)
    