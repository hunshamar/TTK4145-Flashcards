from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
# from routes import initRoute
from routes.user import userBlueprint, jwt
from routes.flashcard import flashcardBlueprint
from routes.cardgroup import cardgroupBlueprint
from db import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

# db = SQLAlchemy()

app = Flask(__name__)
CORS(app, supports_credentials=True) # Support credentials to allow sessions in blueprints
# CORS(app) # Support credentials to allow sessions in blueprints


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydb.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "myawesomesecretisnevergonnagiveyouup"
app.config["JWT_BLACKLIST_ENABLED"] = True
app.config["JWT_BLACKLIST_TOKEN_CHECKS"] = ["access", "refresh"]
jwt.init_app(app)


app.secret_key = 'super secret key'


db.init_app(app)

# app.register_blueprint(initRoute)
app.register_blueprint(userBlueprint)
app.register_blueprint(flashcardBlueprint)
app.register_blueprint(cardgroupBlueprint)

@app.route("/init")
def init():
    db.create_all()
    return jsonify(session.get("userdata"))





if __name__ == "__main__":
    app.run(debug=True)
    