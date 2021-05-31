# TTK4145 Flashcards

requirements: node, python3, pip

## In terminal for flask server: 
`cd server`  
`pip install venv`  
`python3 -m venv venv`  
`source venv/bin/activate`  
`pip install -r requirements.txt`  
Add .env in server folder with ADMIN_PASSWORD, JWT_SECRET_KEY, APP_SECRET_KEY, FEIDE_API_KEY  
`flask run`

## Second terminal for react client
`cd client`  
`npm i`  
`npm start`  

## More guide

The server should be running on localhost:5000, the client on localhost:3000. Go to http://localhost:3000/ in your browser to access client. 

### 1. Initialize application db
Open terminal in server folder  
`flask shell`  
`from db import db`  
`db.create_all()`  
`quit()`  
By default, SQLite is used. This can be changed to mySQL or postgreSQL in app.py file  

### 2. add admin user
- Log in with feide on the client application  
`flask shell`  
`from blueprints.user.user import make_admin_username`  
`make_admin("YOUR_USERNAME")`  
`quit()`


### 3. add dummy date to db
`flask shell`  
`from dummy_db import init_dummy_db, clear_dummy_db`  
`init_dummy_db()`  
to clear: `clear_dummy_db()`  
`quit()`

### 4. Reset SQLite database 
-delete db.db file in server folder (or drop database in mySQL)
-repeat step 1: initialize application db



send mail to asgeirhuns@gmail.com for further questions.





