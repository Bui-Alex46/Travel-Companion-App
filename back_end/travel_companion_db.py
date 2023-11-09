import sqlite3


conn = sqlite3.connect('travel_companion_db')

c = conn.cursor()


statement = '''CREATE TABLE favorites (
            name        TEXT    NOT NULL,
            address     TEXT    NOT NULL
    );'''

c.execute(statement)

conn.commit()


def insert_fav(self):
    with conn:
        c.execute("INSERT INTO favorites VALUES (:name, :address)", {'name': self.name, 'address': self.address})






conn.close()