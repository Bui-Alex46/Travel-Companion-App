import sqlite3


conn = sqlite3.connect('travel_companion.db')

c = conn.cursor()

create_favorites = '''CREATE TABLE IF NOT EXISTS favorites (
            id          INTEGER     NOT NULL PRIMARY KEY AUTOINCREMENT,
            name        TEXT        NOT NULL,
            addressID   INTEGER     NOT NULL UNIQUE,
            userID      INTEGER     NOT NULL UNIQUE,
            FOREIGN KEY(addressID) REFERENCES address(id) ON DELETE CASCADE,
            FOREIGN KEY(userID) REFERENCES account(accountId)  ON DELETE CASCADE
    );'''

drop_favorites = '''DROP TABLE favorites;'''
drop_address = '''DROP TABLE address'''

create_info = '''CREATE TABLE account (accountId INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, user_name VARCHAR(255) NOT NULL UNIQUE, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);
'''

create_address = '''CREATE TABLE IF NOT EXISTS address (
            id          INTEGER     NOT NULL PRIMARY KEY AUTOINCREMENT,
            street      TEXT        NOT NULL,
            city        TEXT        NOT NULL,
            state       TEXT        NOT NULL,
            zip         INTEGER     NOT NULL 
    );'''




c.execute(create_address)

conn.commit()






conn.close()
