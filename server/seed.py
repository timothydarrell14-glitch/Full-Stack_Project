from datetime import date

from app import create_app
from app.extensions import db
from app.models.associations import transactions_tags
from app.models.savings import Saving
from app.models.tags import Tag
from app.models.transactions import Transaction
from app.models.users import User


app = create_app()


def seed_data():
    with app.app_context():
        db.session.execute(transactions_tags.delete())
        db.session.query(Transaction).delete()
        db.session.query(Tag).delete()
        db.session.query(Saving).delete()
        db.session.query(User).delete()
        db.session.commit()

        users = [
            {"name": "Ava Johnson", "email": "ava@example.com", "age": 28, "password": "password1"},
            {"name": "Noah Patel", "email": "noah@example.com", "age": 32, "password": "password2"},
            {"name": "Mia Chen", "email": "mia@example.com", "age": 27, "password": "password3"},
            {"name": "Liam Brooks", "email": "liam@example.com", "age": 35, "password": "password4"},
            {"name": "Sophia Ruiz", "email": "sophia@example.com", "age": 29, "password": "password5"},
            {"name": "Ethan Walker", "email": "ethan@example.com", "age": 41, "password": "password6"},
            {"name": "Olivia Kim", "email": "olivia@example.com", "age": 24, "password": "password7"},
            {"name": "James Foster", "email": "james@example.com", "age": 37, "password": "password8"},
            {"name": "Amelia Scott", "email": "amelia@example.com", "age": 31, "password": "password9"},
            {"name": "Benjamin Gray", "email": "benjamin@example.com", "age": 39, "password": "password10"},
        ]

        created_users = []
        for data in users:
            user = User(name=data["name"], email=data["email"], age=data["age"], role="client")
            user.set_password(data["password"])
            db.session.add(user)
            created_users.append(user)
        db.session.commit()

        savings_goals = [
            ("Emergency Fund", 5000, 1250, date(2025, 6, 30), date(2024, 1, 1)),
            ("Vacation", 2500, 700, date(2025, 8, 15), date(2024, 2, 1)),
            ("New Laptop", 1800, 450, date(2025, 10, 1), date(2024, 3, 1)),
            ("Home Renovation", 8000, 2200, date(2026, 1, 15), date(2024, 4, 1)),
            ("Wedding", 6000, 1500, date(2026, 5, 20), date(2024, 5, 1)),
            ("Car Down Payment", 4000, 900, date(2025, 12, 10), date(2024, 6, 1)),
            ("Education Fund", 3000, 800, date(2026, 3, 5), date(2024, 7, 1)),
            ("Fitness Equipment", 1200, 300, date(2025, 9, 1), date(2024, 8, 1)),
            ("Holiday Trip", 2200, 600, date(2025, 11, 20), date(2024, 9, 1)),
            ("Business Reserve", 7000, 1800, date(2026, 2, 10), date(2024, 10, 1)),
        ]

        for index, (title, goal, amount, goal_date, start_date) in enumerate(savings_goals):
            saving = Saving(
                title=title,
                goal=goal,
                amount=amount,
                goal_date=goal_date,
                start_date=start_date,
                user_id=created_users[index % len(created_users)].id,
            )
            db.session.add(saving)
        db.session.commit()

        tags = [
            "Salary",
            "Freelance",
            "Groceries",
            "Rent",
            "Utilities",
            "Dining Out",
            "Transport",
            "Shopping",
            "Medical",
            "Transfer",
        ]

        created_tags = []
        for tag_name in tags:
            tag = Tag(name=tag_name)
            db.session.add(tag)
            created_tags.append(tag)
        db.session.commit()
        created_tags = Tag.query.order_by(Tag.id).all()

        transactions = [
            ("Monthly Salary", 3200.0, date(2024, 1, 2)),
            ("Grocery Run", 84.75, date(2024, 1, 3)),
            ("Freelance Design", 650.0, date(2024, 1, 5)),
            ("Rent Payment", 1400.0, date(2024, 1, 6)),
            ("Electric Bill", 92.4, date(2024, 1, 8)),
            ("Dinner Out", 58.2, date(2024, 1, 10)),
            ("Bus Pass", 25.0, date(2024, 1, 12)),
            ("Online Shopping", 132.9, date(2024, 1, 14)),
            ("Doctor Visit", 110.0, date(2024, 1, 17)),
            ("Transfer to Savings", 300.0, date(2024, 1, 20)),
        ]

        created_transactions = []
        for index, (name, amount, tx_date) in enumerate(transactions):
            transaction = Transaction(
                name=name,
                user_id=created_users[index % len(created_users)].id,
                amount=amount,
                date=tx_date,
            )
            db.session.add(transaction)
            created_transactions.append(transaction)
        db.session.commit()

        for index, transaction in enumerate(created_transactions):
            tag = created_tags[index % len(created_tags)]
            transaction.tags.append(tag)
        db.session.commit()

        print("Seed data inserted successfully.")
        print(f"Users: {User.query.count()}")
        print(f"Savings: {Saving.query.count()}")
        print(f"Tags: {Tag.query.count()}")
        print(f"Transactions: {Transaction.query.count()}")
        print(f"Transaction-tag associations: {db.session.execute(transactions_tags.select()).rowcount}")


if __name__ == "__main__":
    seed_data()
