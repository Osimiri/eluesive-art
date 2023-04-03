#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS

# Local imports
from config import app, db, api
from models import Comment, Update, User, Project, UserProject, db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

# Views go here!

@app.route('/')
def index():
    return '<h1> Dont let your Art Elude you </h1>'

class Users(Resource):
    def get(self):
        users = User.query.all()
        users_dict =  [user.to_dict() for user in users]

        response = make_response(
            jsonify(users_dict),
            200
        )

        return response 
        
api.add_resource(Users, '/users')     #Recursion Error 

class Updates(Resource):
    def get(self):
        updates = Update.query.all()
        updates_dict =  [update.to_dict() for update in updates]

        response = make_response(
            jsonify(updates_dict),
            200
        )

        return response 
        
api.add_resource(Updates, '/updates')

class Comments(Resource):
    def get(self):
        comments = Comment.query.all()
        comments_dict =  [comment.to_dict() for comment in comments]

        response = make_response(
            jsonify(comments_dict),
            200
        )

        return response 
        
api.add_resource(Comments, '/comments')

class Projects(Resource):
    def get(self):
        projects = Project.query.all()
        projects_dict =  [project.to_dict() for project in projects]

        response = make_response(
            jsonify(projects_dict),
            200
        )

        return response 
        
api.add_resource(Projects, '/projects') #recursion error

class UserProjects(Resource):
    def get(self):
        user_projects = UserProject.query.all()
        user_projects_dict =  [user_project.to_dict() for user_project in user_projects]

        response = make_response(
            jsonify(user_projects_dict),
            200
        )

        return response 
        
api.add_resource(UserProjects, '/user_projects') #recursion error


if __name__ == '__main__':
    app.run(port=5555, debug=True)
