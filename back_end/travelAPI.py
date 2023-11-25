from flask import Flask, request, jsonify, g, session ,render_template
from datetime import timedelta
import datetime
import sqlite3
from functools import wraps
from email_validator import validate_email, EmailNotValidError
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'Sa_sa'

app.permanent_session_lifetime = timedelta(minutes=10)




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
        

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = session.get('Authorization') #https://127.0.0.1:5000/route?token=afhftdchbiuig
       
        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            print(data)
        except Exception as e:
            print(str(e))
            return jsonify({'message' : 'Token is invalid !!'}), 401

        return f(*args, **kwargs)
    return decorated


@app.route("/signup", methods=["POST"])
def signup():
    first = request.form.get("first_name")
    last = request.form.get("last_name")
    user = request.form.get("user_name")
    email = request.form.get("email")
    password = request.form.get("passw")

    # if not (first and last and user and email and password):
    #         return jsonify({'error': 'All form fields are required'}), 400
    print(first)
    print(last)
    print(user)
    print(email)
    print(password)

    if len(password) < 4 or len(password) > 255:
        msg = 'Password needs to be between 4 and 255 characters long.'
        return jsonify({'error': msg})
        # return render_template('signup.html', msg = msg)
    
    #username must be between 4 and 255 
    if len(user) < 4 or len(user) > 255:
         msg= 'Username needs to be between 4 and 255 characters long.'
         return jsonify({'error':msg})
         #return render_template('signup.html', msg = msg)
    
    try:
        # Check that the email address is valid.
        validation = validate_email(email)

        # Take the normalized form of the email address
        # for all logic beyond this point (especially
        # before going to a database query where equality
        # may not take into account Unicode normalization).  
        email = validation.email
    except EmailNotValidError as e:
        # Email is not valid.
        # The exception message is human-readable.
        return jsonify({'error': str(e)}), 500

    #username cannot include whitespace
    if any (char.isspace() for char in user):
         msg = 'Username cannot have spaces in it.'
         return jsonify({'error':msg})

         #return render_template('signup.html', msg = msg)
    
    #password cannot include whitespace
    if any (char.isspace() for char in password):
         msg = 'Password cannot have spaces in it.'
         return jsonify({'error':msg})

         #return render_template('signup.html', msg = msg)    


    db = get_db()
    cursor = db.cursor()

    getCountByUsername = '''SELECT COUNT(*) FROM account WHERE user_name = ?'''
    cursor.execute(getCountByUsername,[user])
    countOfUsername = cursor.fetchone()

    if countOfUsername[0] != 0 :
         msg = 'Username already exists.'
         return jsonify({'error':msg})


    query = '''INSERT INTO account (first_name, last_name, user_name, email, password) VALUES (?,?,?,?,?)'''
    
    try:
        cursor.execute(query,(first,last,user,email,password))
        db.commit()
    except sqlite3.Error as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    
    return jsonify({'Account Successfully Created'}), 201


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