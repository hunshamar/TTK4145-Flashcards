from db import db

from blueprints.user.user import User, add_user, delete_user
from blueprints.cardgroup.cardgroup import add_cardgroup, delete_cardgroup, get_cardgroup_by_title
from blueprints.flashcard.flashcard import add_flashcard
from blueprints.peerreview.peerreview import Peerreview, add_peer_reviews_for_all_students, delete_all_peerreviews_in_cardgroup
from blueprints.cardrating.cardrating import save_quality_rating, save_difficulty_rating
from datetime import datetime, timezone, timedelta
from random import randrange


N_USERS = 100


users = [
    {
        "username": "username"+str(i), "email": "user"+str(i)+"@ntnu.no", "name": "name"+str(i)
    } for i in range(N_USERS)
]


now = datetime.now(timezone.utc).replace(tzinfo=None)
one_hour_later_than_now = now + timedelta(hours=1)

one_week_earlier_than_now = now + timedelta(days=-7)
one_hour_earlier_than_now = now + timedelta(hours=-1)
one_week_later_than_now = now + timedelta(days=7)

cardgroups = [
    {
        "title": "Example Cardgroup 1",
        "due_date": one_week_earlier_than_now,
        "peerreview_due_date": one_hour_earlier_than_now,
        "ratings_per_student": 25,
        "number_of_cards_due": 3,
    },
    {
        "title": "Second Example Cargroup ",
        "due_date": one_hour_earlier_than_now,
        "peerreview_due_date": one_week_later_than_now,
        "ratings_per_student": 20,
        "number_of_cards_due": 2,
    },
    {
        "title": "Third Example Cardgroup",
        "due_date": one_week_later_than_now,
        "peerreview_due_date": None,
        "ratings_per_student": None,
        "number_of_cards_due": 4,
    }

]


def init_dummy_db():

    print(users)
    for user in users:
        username = user["username"]
        email = user["email"]
        name = user["name"]

        add_user(username, email, name)

    for cardgroup in cardgroups:
        added_cardgroup = add_cardgroup(cardgroup["title"], one_hour_later_than_now,
                                        cardgroup["number_of_cards_due"])

        for user in User.query.all():
            for i in range(added_cardgroup.number_of_cards_due):
                front = f"User with username {user.username}'s question nr. {i+1} in cardgroup {added_cardgroup.title}"
                back = f"User with username {user.username}'s answer nr. {i+1} in cardgroup {added_cardgroup.title}"
                add_flashcard(front, back, user.id, added_cardgroup.id)

        added_cardgroup.due_date = cardgroup["due_date"]

        if cardgroup["peerreview_due_date"] and cardgroup["ratings_per_student"]:
            print("add shit")
            add_peer_reviews_for_all_students(
                added_cardgroup.id, one_hour_later_than_now, cardgroup["ratings_per_student"])

            added_cardgroup = get_cardgroup_by_title(cardgroup["title"])

            for peerreview in added_cardgroup.peerreviews:
                for rating in peerreview.ratings:
                    save_difficulty_rating(
                        peerreview.user_id, rating.id, randrange(1, 11))
                    save_quality_rating(peerreview.user_id,
                                        rating.id, randrange(1, 11))

            added_cardgroup.peer_review_due_date = cardgroup["peerreview_due_date"]

        db.session.commit()


def clear_dummy_db():

    for cardgroup in cardgroups:
        try:
            cgid = get_cardgroup_by_title(cardgroup["title"]).id
            delete_all_peerreviews_in_cardgroup(cgid)
            delete_cardgroup(cgid)
        except Exception as e:
            print("error", str(e))
            pass

    for user in users:
        try:
            delete_user(user["username"])
        except Exception:
            pass
