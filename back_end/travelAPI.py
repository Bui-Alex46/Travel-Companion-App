from flask import Flask, request, jsonify, make_response, g, session ,render_template
from datetime import timedelta
from functools import wraps
from email_validator import validate_email, EmailNotValidError
import datetime
import sqlite3
import jwt
from flask_cors import CORS  # Import the CORS module
app = Flask(__name__)
app.config['SECRET_KEY'] = 'Sa_sa'
CORS(app)

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
            print(data) # What's data?
            if 'userID' not in session:
                return jsonify({'message': 'User ID not found in session.'}), 401
        except Exception as e:
            print(str(e))
            return jsonify({'message' : 'Token is invalid !!'}), 401

        return f(*args, **kwargs)
    return decorated

@app.route("/login", methods=["POST"])
def login():

    db = get_db()
    cursor = db.cursor()
    try:
        msg = ''

        username = request.form.get('user_name')
        password = request.form.get('password')
        

        # # COUNT() means that it returns the number of rows that matches a specified criterion
        # getCountByUsernameAndPassword = '''SELECT COUNT(*) FROM account WHERE user_name = ? AND password = ?'''
        # cursor.execute(getCountByUsernameAndPassword, [username, password])
        print('Received form data:', request.form)
        print('Username:', request.form.get('user_name'))
        print('Password:', request.form.get('password'))

        getUserIdByUsernameAndPassword = '''SELECT id FROM account WHERE user_name = ? AND password = ?'''
        cursor.execute(getUserIdByUsernameAndPassword, [username, password])
        
        #print("Did execute")
        
        user_id = cursor.fetchone()
        print('User ID:', user_id[0])

        #print("Did fetchone")

        if not user_id:

            msg = 'Account does not exist.'
            return jsonify(msg=msg)
        #print("count is 1")

        #token is like a hall pass that only works for a limited time
        token = jwt.encode({'user': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=10)}, app.config['SECRET_KEY'], algorithm="HS256")

        #token = jwt.encode({a:"b"}, app.config['SECRET_KEY'], algorithm="HS256")
        


        session['Authorization'] = token
        
        # sessions carry data over the website
        session['loggedin'] = True

        session['username'] = username
        
        session['userID'] = user_id[0]
        
    
        msg = 'Authentication successful'
        return jsonify({'message': msg, 'userID': user_id[0], 'token': token})  # Include user ID in the response
    
    except Exception as e:
        
        #make sure to include this when developing an api or web server when wanting to check for errors without users
        #seeing it
        #print(str(e))
        #msg = 'Account does not exist.'
        
        msg = str(e)

        return jsonify(msg=msg)


@app.route("/signup", methods=["POST"])
def signup():
    first = request.form.get("first_name")
    last = request.form.get("last_name")
    user = request.form.get("user_name")
    email = request.form.get("email")
    password = request.form.get("passw")

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
    
    return jsonify({'message': 'Account Successfully Created'}), 201



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
    name = request.form.get("name")
    address_id = request.form.get("address_id")
    user_id = request.form.get("user_id")
    

    print(f"Received data - Name: {name}, Address ID: {address_id}, User ID: {user_id}")

    # Validate input
    if not name or not address_id or not user_id:
        return jsonify({'error': 'Missing name or address'}), 400

    db = get_db()
    cursor = db.cursor()
    
    
    # Insert into favorites
    try:
        # Since there's no user session check, you might want to handle user identification differently
        cursor.execute('INSERT INTO favorites (name, addressID, userID) VALUES (?, ?, ?)', (name, address_id, user_id))
        db.commit()
    except sqlite3.Error as e:
        db.rollback()
        print(f"SQLite error: {e}")
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'Place added successfully!'}), 201


@app.route('/favorite', methods=['GET', 'OPTIONS'])
def get_favorite():
    print('GET /favorite route triggered')
    # Explicitly handle CORS for OPTIONS requests
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
        }
        return '', 204, headers

    # Your existing route logic
    db = get_db()
    cursor = db.cursor()
    

    # Assuming you have the user's ID in the session
    user_id = session.get('userID')
    print(f"User ID: {user_id}")
    if user_id is None:
        return jsonify({'error': 'User not authenticated'}), 401

    try:
        # Fetching data directly from the favorites table based on the userID
        cursor.execute("""
            SELECT name
            FROM favorites
            WHERE userID = ?
        """, (user_id,))

        favorites = cursor.fetchall()

        return jsonify(favorites), 200

    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()

@app.route('/delete', methods=['DELETE'])
def delete_favorite():
    db = get_db()
    cursor = db.cursor()
    name = request.form['name']
    # Delete favorite by UserId

    try:
        query = 'DELETE FROM favorites WHERE name = (?)'
        cursor.execute(query, (name,))
        db.commit()
    
    except sqlite3.Error as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'Place deleted successfully!'}), 201

@app.route("/get_user_id", methods=["GET"])
@token_required  # Assuming you want to ensure the request has a valid token
def get_user_id():
    try:
        user_id = session.get('userID')
        if user_id is not None:
            return jsonify({'id': user_id}), 200
        else:
            return jsonify({'message': 'User ID not found in session.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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