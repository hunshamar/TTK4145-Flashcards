from db import db
import datetime as datetime
import random
# from ..flashcard.flashcard import Flashcard

from ..flashcard.flashcard import Flashcard
from ..user.user import User
from ..collective_deck.collective_deck import CollectiveDeck, get_collective_deck


class FlashcardReview(db.Model):
    __tablename__ = "flashcard_review"
    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer) #todo: rename order index
    flashcard_deck = db.Column(
        db.Integer, db.ForeignKey('user_flashcard_deck.id'))

    # flashcard
    flashcard_id = db.Column(db.Integer, db.ForeignKey('flashcard.id'))
    flashcard = db.relationship("Flashcard", back_populates="flashcardreviews")

    def move_to_back_of_deck(self):
        deck = UserFlashcardDeck.query.get(self.flashcard_deck)
        last_order = FlashcardReview.query.filter_by(
            flashcard_deck=self.flashcard_deck).order_by(FlashcardReview.order.desc()).first().order
        self.order = last_order + 1
        db.session.commit()

    def remove_from_user_deck(self):
        this_review = FlashcardReview.query.get(self.id)
        db.session.delete(this_review)
        db.session.commit()


class UserFlashcardDeck(db.Model):
    __tablename__ = "user_flashcard_deck"
    # title = db.Column(db.String(256))
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256))

    n_flashcards_originally = db.Column(db.Integer)

    correct_answers = db.Column(db.Integer)
    wrong_answers = db.Column(db.Integer)


    flashcard_reviews = db.relationship(
        "FlashcardReview", backref="user_flashcard_deck", cascade="all,delete", lazy='subquery')
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id": self.user_id,
            "correctAnswers": self.correct_answers,
            "wrongAnswers": self.wrong_answers,
            "nFlashcardsOriginally": self.n_flashcards_originally,
            "nFlashcards": len(self.flashcard_reviews)
        }

    def get_flashcards(self):
        print("these are coming")
        return [fr.flashcard.to_dict() for fr in self.flashcard_reviews]

    def __init__(self, title, user_id, flashcards):
        self.title = title
        self.user_id = user_id
        self.n_flashcards_originally = len(flashcards)
        self.correct_answers = 0
        self.wrong_answers = 0
        self.flashcard_reviews = [create_flashcard_review(
            flashcard, count) for count, flashcard in enumerate(flashcards)]


def create_flashcard_review(flashcard, order):
    flashcard_review = FlashcardReview(flashcard=flashcard, order=order)
    db.session.add(flashcard_review)
    db.session.commit()
    return flashcard_review


def get_deck_cards(user_id, deck_id):

    print("getting deck cards")
    deck = UserFlashcardDeck.query.get(deck_id)
    if deck.user_id != user_id:
        raise Exception("Not your deck")

    reviews = FlashcardReview.query.filter_by(
        flashcard_deck=deck.id).order_by(FlashcardReview.order).all()

    return [r.flashcard.public_to_dict() for r in reviews]


def answer_review(correct, flashcard_deck_id, card_id, user_id):

    flashcard_reviews = FlashcardReview.query.filter_by(
        flashcard_deck=flashcard_deck_id, flashcard_id=card_id).all()
    if not len(flashcard_reviews):
        raise Exception("could not find flashcard")
    if len(flashcard_reviews) > 1:
        raise Exception("Multiple cards error")

    flashcard_review = flashcard_reviews[0]

    deck = UserFlashcardDeck.query.get(flashcard_review.flashcard_deck)
    if deck.user_id != user_id:
        raise Exception("Not your card")

    if correct:
        deck.correct_answers += 1
        flashcard_review.remove_from_user_deck()
    else:
        deck.wrong_answers += 1
        flashcard_review.move_to_back_of_deck()

    return get_deck_cards(user_id, deck.id)


def create_user_flashcard_deck(title, user_id, flashcards, number_of_cards):
    collective_deck = get_collective_deck()

    if not title:
        raise Exception("No name")

    max_chacacters = 50
    if len(title) > max_chacacters:
        raise Exception(
            f"Title too long ({len(title)} characters). Max {max_chacacters} characters")

    if UserFlashcardDeck.query.filter_by(title=title, user_id=user_id).first():
        raise Exception(f"You already have a deck named '{title}'")
    got_flashcards = [Flashcard.query.get(
        f["id"]) for f in flashcards if Flashcard.query.get(f["id"]).collective_deck_id]
    random.shuffle(got_flashcards)

    if number_of_cards > len(got_flashcards):
        raise Exception("Error creating deck. Too many cards")

    if not number_of_cards:
        raise Exception("Error. Number of flashcards can not be 0")

    if (len(flashcards) != len(got_flashcards)):
        raise Exception(
            "Error. Could not fetch all flashcards from collective deck")

    got_flashcards = got_flashcards[:number_of_cards]
    user_flashcard_deck = UserFlashcardDeck(
        title=title, user_id=user_id, flashcards=got_flashcards)
    db.session.add(user_flashcard_deck)
    db.session.commit()
    return user_flashcard_deck


def get_user_flashcard_decks(uid):
    user_flashcard_decks = UserFlashcardDeck.query.filter_by(user_id=uid).all()
    return [u.to_dict() for u in user_flashcard_decks]


def get_user_flashcard_deck(user_id, deck_id):
    deck = UserFlashcardDeck.query.get(deck_id)
    if deck.user_id != user_id:
        raise Exception("You do not own this flashcard deck")
    return [deck.to_dict()]


def delete_user_flashcard_deck(user_id, deck_id):
    deck = UserFlashcardDeck.query.get(deck_id)
    if deck.user_id != user_id:
        raise Exception("You do not own this flashcard deck")

    db.session.delete(deck)
    db.session.commit()

    return deck.to_dict()
