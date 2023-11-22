import sqlite3


conn = sqlite3.connect('travel_companion.db')

c = conn.cursor()

create_favorites = '''CREATE TABLE IF NOT EXISTS favorites (
            id          INTEGER     NOT NULL PRIMARY KEY,
            name        TEXT        NOT NULL,
            addressID   INTEGER     NOT NULL UNIQUE,
            FOREIGN KEY(addressID) REFERENCES address(id)
    );'''

drop_favorites = '''DROP TABLE favorites;'''

create_info = '''CREATE TABLE account (accountId INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, user_name VARCHAR(255) NOT NULL UNIQUE, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);
'''

create_address = '''CREATE TABLE IF NOT EXISTS address (
            id          INTEGER     NOT NULL PRIMARY KEY,
            street      TEXT        NOT NULL,
            city        TEXT        NOT NULL,
            state       TEXT        NOT NULL,
            zip         INTEGER     NOT NULL 
    );'''




c.execute(create_info)

conn.commit()


def insert_fav(self):
    with conn:
        c.execute("INSERT INTO favorites VALUES (:name, :address)", {'name': self.name, 'address': self.address})






conn.close()
