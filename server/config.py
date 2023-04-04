# Standard library imports

# Remote library imports
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
# import secrets 

# Local imports

# Instantiate app, set attributes
app = Flask(__name__)

# secret_key = secrets.token_bytes(16)
# app.secret_key = secret_key.hex()

app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1b\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)
# Instantiate CORS
CORS(app)

# Instantiate REST API
api = Api(app)