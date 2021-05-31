from db import db
import datetime as datetime


from ..flashcard.flashcard import Flashcard
from ..cardgroup.cardgroup import Cardgroup
import random


class CollectiveDeck(db.Model):
    __tablename__ = "collective_deck"

    id = db.Column(db.Integer, primary_key=True)
    flashcards = db.relationship("Flashcard", backref="collective_deck")

    def get_cardgroups(self):
        cardgroup_ids = {f.cardgroup_id for f in self.flashcards}
        cardgroups = (Cardgroup.query
                      .filter(Cardgroup.id.in_(cardgroup_ids))
                      .order_by(Cardgroup.id)
                      )
        return cardgroups

    def to_dict(self):

        return {
            "id": self.id,
            "flashcards": [f.to_dict() for f in self.flashcards]
        }


def get_cardgroups_in_collective_deck():
    collective_deck = get_collective_deck()
    cardgroups = collective_deck.get_cardgroups()
    return [c.to_dict() for c in cardgroups]


def create_collective_deck():

    collective_deck = CollectiveDeck()
    db.session.add(collective_deck)
    db.session.commit()
    return collective_deck


def get_collective_deck():
    collective_decks = CollectiveDeck.query.all()

    if len(collective_decks) > 1:
        raise Exception("More than one collective deck found")
    if not len(collective_decks):
        return create_collective_deck()
    else:
        return collective_decks[0]



def add_to_collective_deck(flashcards):

    got_flashcards = [Flashcard.query.get(f["id"]) for f in flashcards]
    if len(got_flashcards) != len(flashcards):
        raise Exception("Error. Could not get all falshcards")

    collective_deck = get_collective_deck()

    changed_cards = []

    for f in got_flashcards:
        if not f.peerreview_due_date_ended():
            raise Exception(
                "One or more of selected cards. Peer review due date not ended")

        if not f.get_n_ratings():
            raise Exception(
                "One or more of selected cards. No ratings on card")

        if f not in collective_deck.flashcards:
            collective_deck.flashcards.append(f)
            changed_cards.append(f)

    db.session.commit()

    return [f.to_dict() for f in changed_cards]


def get_random_collective_deck_flashcards(difficulty_min, difficulty_max, cardgroup_ids, n_cards, id_only):

    queries = [
        Flashcard.average_difficulty >= difficulty_min,
        Flashcard.average_difficulty <= difficulty_max,
        Flashcard.collective_deck_id > 0
    ]
    if cardgroup_ids != "all":
        queries.append(Flashcard.cardgroup_id.in_(cardgroup_ids))

    flashcards = Flashcard.query.filter(
        *queries
    ).all()

    if n_cards != "all":
        n_cards = int(n_cards)
        if n_cards > len(flashcards):
            raise Exception("Error, number of cards exceeds...")
        flashcards = flashcards[:n_cards]

    if id_only:
        return [{"id": f.id} for f in flashcards]
    else:
        return [f.to_dict() for f in flashcards]


def remove_from_collective_deck(flashcards):

    got_flashcards = [Flashcard.query.get(f["id"]) for f in flashcards]
    if len(got_flashcards) != len(flashcards):
        raise Exception("Error. Could not get all falshcards")

    collective_deck = get_collective_deck()
    changed_cards = []

    for f in got_flashcards:
        if not f.peerreview_due_date_ended():
            raise Exception(
                "One or more of selected cards. Peer review due date not ended")

        if f in collective_deck.flashcards:
            collective_deck.flashcards.remove(f)
            changed_cards.append(f)

    db.session.commit()

    return [f.to_dict() for f in changed_cards]
