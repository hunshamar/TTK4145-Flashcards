from flask import Blueprint, request, jsonify
from db import db
from flask import Flask, session
from flask_session import Session

initRoute = Blueprint("init", __name__)

@initRoute.route("/init")
def init():
    db.create_all()
    return "initialized"

