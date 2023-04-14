#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, jsonify, request, session, abort
from flask_migrate import Migrate
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS

# Local imports
from config import app, db, api
from models import Comment, Update, User, Project

@app.route('/')
def index():
    return '<h1> Dont let your Art Elude you </h1>'

class Signup(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')
        image_url = request_json.get('image_url')
        biography = request_json.get('biography')

        user = User(
            username=username,
            image_url=image_url,
            biography=biography
        )

        # the setter will encrypt this
        user.password_hash = password

        print('first')

        try:

            print('here!')
            print(user)
            print(user.to_dict())
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id


            return user.to_dict(), 201

        except IntegrityError:

            print('no, here!')
            
            return {'error': '422 Unprocessable Entity'}, 422

api.add_resource(Signup, '/signup', endpoint='signup')

class CheckSession(Resource):
    
    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Login(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):
    
    def delete(self):
        
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401

api.add_resource(Logout, '/logout', endpoint='logout')
class Users(Resource):
    def get(self):
        users = User.query.all()
        users_dict =  [user.to_dict() for user in users]

        response = make_response(
            jsonify(users_dict),
            200
        )

        return response 
        
api.add_resource(Users, '/users')    

class UsersById(Resource):
    def get(self,id):
        user = User.query.filter(User.id == id).first()
        user_dictionary= user.to_dict()

        if not user:
            return make_response(
                {"error": "User not found"},
                404
            )
        else:
            return make_response(
                jsonify(user_dictionary),
                200
            )
        
api.add_resource(UsersById, '/users/<int:id>')

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

class UpdatesByProjectId(Resource):
    def get(self,id):
        updates = Update.query.filter(Update.project_id == id).all()
        updates_dictionary = [update.to_dict() for update in updates]
        return make_response(jsonify(updates_dictionary),200)

api.add_resource(UpdatesByProjectId, '/project_updates/<int:id>')


class UpdateComments(Resource):

 def get(self,update_id):
    update = Update.query.get_or_404(update_id)
    comments = update.comments
    return jsonify({
        'update': {
            'id': update.id,
            'notes': update.notes,
            'media_type': update.media_type,
            'created_at': update.created_at,
            'updated_at': update.updated_at,
            'project_id': update.project_id
        },
        'comments': [{
            'id': comment.id,
            'content': comment.content,
            'timestamp': comment.timestamp,
            'user_id': comment.user_id,
            'username': comment.get_username(),
            'avatar': comment.get_avatar_by_id(),
            'updated_at': comment.updated_at
        } for comment in comments]
    })
 

api.add_resource(UpdateComments,'/update_comments/<int:update_id>')

class CommentsById(Resource):
    def get(self,id):
        comment = Comment.query.filter(Comment.id == id).first()
        comment_dictionary= comment.to_dict()

        if not comment:
            return make_response(
                {"error": "Comment not found"},
                404
            )
        else:
            return make_response(
                jsonify(comment_dictionary),
                200
            )
    
    def delete(self, id):
        comment = Comment.query.filter(Comment.id == id).first()
        
        if not comment:
            return make_response(
                {"error": "Comment not found"},
                404
            )
        else:
            db.session.delete(comment)
            db.session.commit()
            return make_response(
                {"message": "Comment deleted successfully"},
                200
            )
    
    def patch(self, id):
        comment = Comment.query.filter(Comment.id == id).first()

        if not comment:
            return make_response(
                {"error": "Comment not found"},
                404
            )
        else:
            content = request.json.get('content')

            if content:
                comment.content = content

            db.session.commit()
            return make_response(
                {"message": "Comment updated successfully"},
                200
            )

api.add_resource(CommentsById, '/comments/<int:id>')
class Comments(Resource):
    def get(self):
        comments = Comment.query.all()
        comments_dict =  [comment.to_dict() for comment in comments]

        response = make_response(
            jsonify(comments_dict),
            200
        )

        return response 
    
    def post(self):
        data = request.get_json()
        print(data)
        if not data or not isinstance(data, dict):
            return {'message': 'Invalid JSON'}, 400
        

        content = data.get('content')
        user_id = data.get('user_id')
        update_id = data.get('update_id')
        

        if not content or not user_id or not update_id:
            return {'message': 'Missing required fields'}, 400
        
        new_comment = Comment(content=content, user_id=user_id, update_id=update_id)
        db.session.add(new_comment)
        db.session.commit()
        
        return jsonify({
            'id': new_comment.id,
            'content': new_comment.content,
            'timestamp': new_comment.timestamp,
            'user_id': new_comment.user_id,
            'username': new_comment.get_username(),
            'avatar': new_comment.get_avatar_by_id(),
            'updated_at': new_comment.updated_at
        })

    def patch(self, comment_id):
        comment = Comment.query.get(comment_id)

        # Check if the comment exists
        if not comment:
            return {'message': 'Comment not found'}, 404

        # Check if the user is authorized to update the comment
        if session.get('user_id') != comment.user_id:
            return {'message': 'You are not authorized to update this comment'}, 403

        # Update the comment
        content = request.json.get('content')
        if not content:
            return {'message': 'Missing content field'}, 400

        comment.content = content
        db.session.commit()

        response = make_response(
            jsonify(comment.to_dict()),
            200
        )

        return response
    
    def delete(self, comment_id):
        comment = Comment.query.filter_by(id=comment_id).first()

        if not comment:
            return {'message': 'Comment not found'}, 404

        db.session.delete(comment)
        db.session.commit()

        return make_response(
            jsonify({'message': 'Comment successfully deleted', 'id':id}),
            200
        )
    
        
api.add_resource(Comments, '/comments')

class Projects(Resource):
    def get(self):
        projects = Project.query.all()
        projects_dict = [project.to_dict() for project in projects]

        response = make_response(
            jsonify(projects_dict),
            200
        )

        
        return response
    
    def post(self):
        try:
            data = request.get_json()

            # Extract required fields from data
            title = data.get('title')
            image_url = data.get('image_url')
            description = data.get('description')
            username = data.get('username')
            user_id = data.get('user_id')

            # Find user by username
            user = User.query.filter_by(username=username).first()

            project = Project(
                title=title,
                image_url=image_url,
                description=description,
                creator=username,
                user_id= user_id
            )

            db.session.add(project)
            db.session.commit()

            response = make_response(
                jsonify(project.to_dict()),
                201
            )

            return response

        except Exception as e:
            return {'error': str(e)}, 500

api.add_resource(Projects, '/projects')

class ProjectsById(Resource):
    def get(self,id):
        project = Project.query.filter(Project.id == id).first()
        project_dictionary= project.to_dict()

        if not project:
            return make_response(
                {"error": "Project not found"},
                404
            )
        else:
            return make_response(
                jsonify(project_dictionary),
                200
            )
        
api.add_resource(ProjectsById, '/projects/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
    
