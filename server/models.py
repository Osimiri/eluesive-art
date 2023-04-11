from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

# db = SQLAlchemy(metadata= MetaData())

# Models go here!



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-user_projects', '-projects.user', '-projects.id','-projects.project_id', '-projects.user_id' )

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    biography = db.Column(db.String)
    image_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())

    projects = db.relationship("UserProject", backref = "user")

    @staticmethod
    def get_username_by_id(user_id):
        user = User.query.get(user_id)
        return user.username if user else None

    @staticmethod
    def get_avatar_by_id(user_id):
        user = User.query.get(user_id)
        return user.image_url if user else None


    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'

class Update(db.Model, SerializerMixin):
    __tablename__ = 'updates'

    serialize_rules = ('-user_projects','-project', '-comments')

    id = db.Column(db.Integer, primary_key=True)
    notes = db.Column(db.String)
    media_type = db.Column(db.String)
    image_url = db.Column(db.String)
    title = db.Column(db.String)  
    likes = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    comments = db.relationship('Comment', backref='update', lazy=True)

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    timestamp = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
        
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    update_id = db.Column(db.Integer, db.ForeignKey("updates.id"))

    def get_username(self):
        return User.get_username_by_id(self.user_id)

    def get_avatar_by_id(self):
        return User.get_avatar_by_id(self.user_id)
    # def get_username(self):
    #     return self.user.username
    # def get_username(self):
    #     user = User.query.get(self.user_id)
    #     return user.username if user else None

class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'

    serialize_rules = ('-user_projects','-users.project', '-projects.user') #'-users.user' will get rid of user info on project

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)  
    likes = db.Column(db.Integer)
    description = db.Column(db.String)
    image_url = db.Column(db.String)
    creator = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
    users = db.relationship("UserProject", backref = "project")
    

class UserProject(db.Model, SerializerMixin):
    __tablename__ = 'user_projects'

    serialize_rules = ('-project.users', '-user.projects','-user_id')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column( db.Integer, db.ForeignKey('users.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
