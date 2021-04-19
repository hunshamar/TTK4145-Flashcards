
from db import db
import datetime
from flask import jsonify

# import parents
from ..flashcard.flashcard import Flashcard, get_flashcard
# from ..user.user import User, getUser

import random

from ..cardgroup.cardgroup import Cardgroup
from ..user.user import User
from ..cardrating.cardrating import Cardrating

MAX_NUMBER_OF_REVIEWS = 40

# peer_review_cards = db.Table('peer_review_cards',
#                              db.Column('id', db.Integer, primary_key=True),
#                              db.Column('flashcard_id', db.Integer,
#                                        db.ForeignKey('flashcard.id')),
#                              db.Column('peerreview_id', db.Integer,
#                                        db.ForeignKey('peerreview.id'))
#                              )


class Peerreview(db.Model):
    __tablename__ = "peerreview"

    # member variables

    id = db.Column(db.Integer, primary_key=True)

    # parents
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    cardgroup_id = db.Column(db.Integer, db.ForeignKey('cardgroup.id'))
    cardgroup = db.relationship("Cardgroup", back_populates="peerreviews")

    # children
    ratings = db.relationship(
        "Cardrating", cascade="all, delete", backref="cardrating")

    # flashcard_ids = db.Column(db.ARRAY(db.Integer)

    def to_dict(self):

        print("asdfgh")
        print(len([r for r in self.ratings if r.is_complete()]))

        return {
            "id": self.id,
            "dueDate": self.cardgroup.peer_review_due_date.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "cardgroup": self.cardgroup.to_dict(),
            "userId": self.user_id,
            "user": User.query.get(self.user_id).to_dict(),
            "reviewsDue": self.cardgroup.number_of_ratings_due,
            "reviewsDone": len([r for r in self.ratings if r.is_complete()]),
        }

    # def get_flashcards(self):
        # return [f.public_to_dict() for f in self.gardgroup.flashcards]

    def get_ratings(self):
        return [r.to_dict() for r in self.ratings]

    def add_ratings(self, cardids):
        if not len(self.ratings):
            flashcards = self.cardgroup.get_cards_from_ids(cardids)
            for index, card in enumerate(flashcards):
                r = Cardrating(card_id=card.id, index=index+1)
                db.session.add(r)
                self.ratings.append(r)

            db.session.commit()
            return [r.to_dict() for r in self.ratings]

        else:
            print("ratings exists")

    # constructor, add 20 random cards from cardgroup for each student

    def __init__(self, cardgroup, user):
        # print(f"Creating peer review for '{cardgroup.title}' for user '{user.username}'")
        self.cardgroup = cardgroup
        self.user_id = user.id


def edit_peerreview(cardgroup_id, due_date):
    cardgroup = Cardgroup.query.get(cardgroup_id)

    current_gmt_time = datetime.datetime.now(
        datetime.timezone.utc).replace(tzinfo=None)

    if due_date < current_gmt_time:
        raise Exception("Due date can not be in the past")
    if due_date <= cardgroup.due_date:
        raise Exception(
            "Due date of peerreview must be later than due date of cardgroup")

    if current_gmt_time <= cardgroup.due_date:
        raise Exception("This Cardgroups' due date has not yet expired")

    cardgroup.peer_review_due_date = due_date
    db.session.commit()


def get_peer_review(pid):
    return Peerreview.query.get(pid)

#
# picks random cards for users, but ensured all cards are picked the same number of times
#


def get_ratings_in_peerreview(prid):
    ratings = Cardrating.query.filter_by(peerreview_id=prid).order_by(Cardrating.id).all()

    return [r.to_dict() for r in ratings]


    


def delete_all_peerreviews_in_cardgroup(cgid):
    peerreview = Peerreview.query.filter_by(cardgroup_id=cgid).all()
    for p in peerreview:
        db.session.delete(p)

    db.session.commit()


def pick_random_cards(cardids, number_of_users, ratings_per_student):

    users_cards = []
    for n in range(number_of_users):
        users_cards.append([])

    cards = cardids.copy()
    random.shuffle(cards)
    for u in range(number_of_users):
        # not enough cards to draw from ?
        if (len(cards) < ratings_per_student):

            # take all remaining cards
            users_cards[u] += cards

            # create new random cards
            cards = cardids.copy()
            random.shuffle(cards)

            # fill remaining cards
            for n in range(ratings_per_student - len(users_cards[u])):
                for i, c in enumerate(cards):
                    if c not in users_cards[u]:
                        users_cards[u].append(cards.pop(i))
                        break

        else:
            for n in range(ratings_per_student):

                for i, c in enumerate(cards):
                    if c not in users_cards[u]:
                        users_cards[u].append(cards.pop(i))
                        break

    return users_cards


def add_peer_reviews_for_all_students(cardgroup_id, due_date, ratings_per_student):

    cardgroup = Cardgroup.query.get(cardgroup_id)

    current_gmt_time = datetime.datetime.now(
        datetime.timezone.utc).replace(tzinfo=None)

    print("The due dates")
    print(due_date)
    print(cardgroup.due_date)

    if not (cardgroup_id and due_date and ratings_per_student):
        raise Exception("Error, missing credentials for adding peer review")

    if due_date < current_gmt_time:
        raise Exception("Due date can not be in the past")
    if due_date <= cardgroup.due_date:
        raise Exception(
            "Due date of peerreview must be later than due date of cardgroup")

    if current_gmt_time <= cardgroup.due_date:
        raise Exception("This Cardgroups' due date has not yet expired")

    if int(ratings_per_student) < 1:
        raise Exception("Number of reviews must be larger than 0")
    if int(ratings_per_student) > MAX_NUMBER_OF_REVIEWS:
        raise Exception("Number of reviews are limited to " +
                        str(MAX_NUMBER_OF_REVIEWS))
    if int(ratings_per_student > len(cardgroup.flashcards)):
        raise Exception(
            f"Reviews per student ({ratings_per_student}) exceeds flashcards in cardgroup ({len(cardgroup.flashcards)})")

    cardgroup.peer_review_due_date = due_date
    cardgroup.number_of_ratings_due = ratings_per_student

    users = User.query.all()

    card_ids = []
    cards = cardgroup.flashcards
    for c in cards:
        card_ids.append(c.id)

    print("1")
    peer_review_user_card_ids = pick_random_cards(
        card_ids, len(users), ratings_per_student)

    print("2")
    for index, user in enumerate(users):

        if(Peerreview.query.filter_by(user_id=user.id, cardgroup_id=cardgroup.id)).first():
            print(
                "Peer review already exists for this group, for this student with id", user.id)
        else:
            # print("create peer review")
            print("3")
            peerreview = Peerreview(
                cardgroup, user)

            peerreview.add_ratings(peer_review_user_card_ids[index])
            print("4")

    print("added to sesh")
    db.session.commit()


def get_cardgroup_peerreviews(cgid):

    print("from chapter with id", cgid)

    cardgroup = Cardgroup.query.get(cgid)

    return cardgroup.get_peerreviews()


def get_user_peerreviews(uid):
    peerreviews = Peerreview.query.filter_by(user_id=uid).all()
    return [p.to_dict() for p in peerreviews]


def delete_all_peerreviews():
    re = Peerreview.query.all()
    for r in re:
        db.session.delete(r)

    db.session.commit()


def get_peer_review_cards(pid):
    peerreview = Peerreview.query.get(pid)
    if not peerreview:
        raise Exception("Peer review not found with id", pid)
    return peerreview.get_flashcards()


def getRatingsInPeerreview(pid, uid):
    # flashcards = Peerreview.query.get(pid).flashcards
    # print("getting")

    # ratings = []
    # for f in flashcards:
    #     print("flsahcard", f.front)
    #     rating = Cardrating.query.filter_by(user_id=uid, card_id=f.id).first()
    #     if rating:
    #         ratings.append(rating)

    return [r.to_dict() for r in ratings]
