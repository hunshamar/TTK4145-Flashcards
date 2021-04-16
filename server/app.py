from dummy_db import init_dummy_db, clear_dummy_db
import pymysql
from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from blueprints.user.routes import userBlueprint, jwt
from blueprints.flashcard.routes import flashcardBlueprint
from blueprints.cardgroup.routes import cardgroupBlueprint
from blueprints.cardrating.routes import cardratingBlueprint
from blueprints.peerreview.routes import peerreviewBlueprint
from blueprints.cardreview_deck.routes import cardreviewDeckBlueprint
from blueprints.cardreview.routes import cardreviewBlueprint
from blueprints.collective_deck.routes import collectiveDeckBlueprint
from blueprints.user_flashcard_deck.routes import userFlashcardDeckBlueprint

from blueprints.user.user import User
from db import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
# from flask_user import UserManager

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

# key stuff
import os
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__, static_folder="build", static_url_path="/")
# Support credentials to allow sessions in blueprints
CORS(app, supports_credentials=True)

# Migration
migrate = Migrate(app, db, compare_type=True)
manager = Manager(app)

manager.add_command("db", MigrateCommand)

db_user = os.environ.get("DB_USER")
db_pass = os.environ.get("DB_USER")
db_host = os.environ.get("DB_USER")
db_name = os.environ.get("DB_NAME")

DB_USER = "root"
DB_HOST = "localhost"
DB_PASS = ""
DB_NAME = "ttk4145"

# conn = "mysql://{0}@{1}/{2}".format(db_user,  db_host, db_name)

conn = "mysql+pymysql://root:password@localhost/ttk4145"

if os.environ.get("FLASK_DEBUG"):
    app.config["SQLALCHEMY_DATABASE_URI"] = conn  # "sqlite:///db.db"
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("POSTGRES_URI")


app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
app.config["JWT_BLACKLIST_ENABLED"] = True
app.config["JWT_BLACKLIST_TOKEN_CHECKS"] = ["access", "refresh"]
jwt.init_app(app)


app.secret_key = os.environ.get("APP_SECRET_KEY")

db.init_app(app)

app.register_blueprint(userBlueprint)
app.register_blueprint(flashcardBlueprint)
app.register_blueprint(cardgroupBlueprint)
app.register_blueprint(cardratingBlueprint)
app.register_blueprint(peerreviewBlueprint)
# app.register_blueprint(cardreviewDeckBlueprint)
# app.register_blueprint(cardreviewBlueprint)
app.register_blueprint(collectiveDeckBlueprint)
app.register_blueprint(userFlashcardDeckBlueprint)


@app.route("/init")
def init():
    db.create_all()
    return jsonify(conn)


@app.route("/1")
def dummy_db_init():
    init_dummy_db()
    return jsonify("inited")


@app.route("/2")
def dummy_db_clear():
    clear_dummy_db()
    return jsonify("cleared")


# @app.route("/<a>")
# def react_routes(a):
#     return app.send_static_file("index.html")

# @app.errorhandler(404)
# def not_found(e):
#     return app.send_static_file('index.html')


# @app.route("/")
# def react_index():
#     return app.send_static_file("index.html")


if __name__ == "__main__":
    # manager.run()
    app.run(debug=True)
