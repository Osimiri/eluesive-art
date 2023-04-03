#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS

# Local imports
from config import app, db, api
from models import Author, Genre, User, UserBook, Book

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
    return '<h1>Welcome To The Better Reads Better Backend</h1>'

class Authors(Resource):
    def get(self):
        authors = Author.query.all()
        authors_dict =  [author.to_dict() for author in authors]

        response = make_response(
            jsonify(authors_dict),
            200
        )

        return response 

    def post(self):        
        new_author = Author(
            full_name= request.get_json()['full_name'],
            biography = request.get_json()['biography'],
            author_image = request.get_json()['author_image']
        )
        db.session.add(new_author)
        db.session.commit()
        print(new_author)
        response = make_response(
            jsonify(new_author.to_dict()),
            201
        )
        return response
        
api.add_resource(Authors, '/authors')     


class AuthorsById(Resource):
    def get(self,id):
        author = Author.query.filter(id == id).first()
        author_dictionary= author.to_dict()

        if not author:
            return make_response(
                {"error": "Author not found"},
                404
            )
        else:
            return make_response(
                jsonify(author_dictionary),
                200
            )
        
api.add_resource(AuthorsById, '/authors/<int:id>')


class Genres(Resource):
    def get(self):
        genres = Genre.query.all()
        genres_dict =  [genre.to_dict() for genre in genres]

        response = make_response(
            jsonify(genres_dict),
            200
        )

        return response 
        
api.add_resource(Genres, '/genres')


class Users(Resource):
    def get(self):
        users = User.query.all()
        users_dict =  [user.to_dict() for user in users]

        response = make_response(
            jsonify(users_dict),
            200
        )

        return response 
    def post(self):
        new_user = Author(
            username= request.get_json()['username'],
            password = request.get_json()['password'],
            full_name = request.get_json()['full_name']
        )
        db.session.add(new_user)
        db.session.commit()

        response = make_response(
            jsonify(new_user.to_dict()),
            201
        )
        return response

api.add_resource(Users, '/users')


class UsersById(Resource):
    def get(self,id):
        user = User.query.filter(id == id).first()
        user_dictionary = user.to_dict()
        
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


class Books(Resource):
    def get(self):
        books = Book.query.all()
        books_dict =  [book.to_dict() for book in books]

        response = make_response(
            jsonify(books_dict),
            200
        )
        return response 

    def post(self):
        # author =  Author.query.filter_by(full_name = request.get_json()['author']).first()    
        fields = request.get_json()
        print(fields)
        genre =  Genre.query.filter_by(genre = request.get_json()['genre']).first()
        new_book = Book(
            title= request.get_json()['title'],
            price = request.get_json()['price'],
            isbn = request.get_json()['isbn'],
            image = request.get_json()['image'],
            likes = request.get_json()['likes'],
            genre_id = genre.id,
            author_id = request.get_json()['author_id']
        )
        db.session.add(new_book)
        db.session.commit()
        print(new_book)
        response = make_response(
            jsonify(new_book.to_dict()),
            201
        )
        return response


api.add_resource(Books, '/books') #recursion error 


class BooksById(Resource):
    def get(self, id):
        book = Book.query.filter_by(id=id).first()
        book_dictionary = book.to_dict()

        if not book:
            return make_response(
                {"error": "Book not found"}, 
                404
            )
        else:
            return make_response(
                jsonify(book_dictionary),
                200
            )
    
    def patch(self, id):

        data = request.get_json()

        book = Book.query.filter_by(id=id).first()

        for attr in data:
            setattr(book, attr, data[attr])

        db.session.add(book)
        db.session.commit()

        return make_response(book.to_dict(), 200)
    
    def delete(self, id):
        book = Book.query.filter_by(id=id).first()
        if not book:
            return make_response(
                jsonify({'error': 'Book not found'}),
                404
            )
        db.session.delete(book)
        db.session.commit()

        return make_response(
            jsonify({'message': 'Book successfully deleted', 'id':id}),
            200
        )

api.add_resource(BooksById, '/books/<int:id>') #recursion error 


class UserBooks(Resource):
    def get(self):
        user_books = UserBook.query.all()
        user_books_dict =  [user_book.to_dict() for user_book in user_books]

        response = make_response(
            jsonify(user_books_dict),
            200
        )
        return response 

api.add_resource(UserBooks, '/user_books') #recursion 


if __name__ == '__main__':
    app.run(port=5555, debug=True)
