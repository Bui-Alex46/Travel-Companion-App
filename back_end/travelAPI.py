from flask import Flask, request, jsonify, g
import sqlite3

app = Flask(__name__)

DATABASE = 'travel_companion.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
        

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# @app.route("/address", methods=['POST'])
# def add_address():
#     street = request.form.get("street")
#     city = request.form.get("city")
#     state = request.form.get("state")
#     zip = request.form.get("zip")
    
#       # Validate input
#     if not street or not city or not state or not zip:
#         return jsonify({'error': 'Missing name or address'}), 400
    
#     db = get_db()
#     cursor = db.cursor()
    
#       # Insert into address
#     try:
#         cursor.execute('INSERT INTO address (street, city, state, zip) VALUES (?, ?, ?, ?)', (street, city, state, zip))
#         db.commit()
#     except sqlite3.Error as e:
#         db.rollback()
#         return jsonify({'error': str(e)}), 500
    
#     return jsonify({'message': 'Place added successfully!'}), 201
    

@app.route("/favorite", methods=['POST'])
def add_favorite():
    #data = request.get_json()
    name = request.form.get("name")
    street = request.form.get("street")
    city = request.form.get("city")
    state = request.form.get("state")
    zip = request.form.get("zip")
    

    # Validate input
    if not name or not street or not city or not state or not zip:
        return jsonify({'error': 'Missing name or address'}), 400



    db = get_db()
    cursor = db.cursor()
    
   
    # Insert into address
    try:
        cursor.execute('INSERT INTO address (street, city, state, zip) VALUES (?, ?, ?, ?)', (street, city, state, zip))
        db.commit()
    except sqlite3.Error as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    
    # Get the address id we just create
    cursor.execute('''SELECT id FROM address WHERE street= (?) AND city = (?) AND state = (?) AND zip = (?)''', (street, city, state, zip))
    address_id = cursor.fetchone()[0]
    
    # Insert into favorite
    try:
        cursor.execute('INSERT INTO favorites (name, addressID) VALUES (?, ?)', (name, address_id))
        db.commit()
    except sqlite3.Error as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'Place added successfully!'}), 201

@app.route('/favorite', methods=['GET'])
def get_favorite():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT name, street, city, state, zip FROM favorites, address WHERE favorites.addressID = address.id")
    favorites = cursor.fetchall()
    return jsonify(favorites), 200

@app.route('/delete', methods=['DELETE'])
def delete_favorite():
    db = get_db()
    cursor = db.cursor()
    name = request.form['name']

    try:
        query = 'DELETE FROM favorites WHERE name = (?)'
        cursor.execute(query, (name,))
        db.commit()
    
    except sqlite3.Error as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'Place deleted successfully!'}), 201



# @app.route('/favorite', methods = ['GET', 'POST', 'DELETE'])
# def favorite():
#     if request.method == 'GET':
#         return '<p>Ok</p>'
    
#     if request.method == 'POST':
#         req_Json = request.json
#         name = req_Json['name']
#         address = req_Json['address']
        
        
        
#         place = Place(name, address)
#         place.insert_fav()
        
#         return "<p>success</p>"


if __name__=='__main__':
    app.run(debug=True)