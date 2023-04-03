# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import MetaData
# from sqlalchemy.orm import validates
# from sqlalchemy.ext.associationproxy import association_proxy
# from sqlalchemy_serializer import SerializerMixin
# from config import db

# # metadata = MetaData(naming_convention={
# #     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# # })

# # db = SQLAlchemy(metadata= MetaData())

# # Models go here!

# class Author(db.Model, SerializerMixin):
#     __tablename__ = 'authors'

#     serialize_rules = ('-books.author','-books.liked_books', '-books')

#     id = db.Column(db.Integer, primary_key=True)
#     full_name = db.Column(db.String)
#     biography = db.Column(db.String)
#     created_at = db.Column(db.DateTime, server_default = db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate = db.func.now())

#     author_books = db.relationship("Book", backref = "author")

# class Genre(db.Model, SerializerMixin):
#     __tablename__ = 'genres'

#     # serialize_rules = ('-books.genre', '-user_books', '-authors' )
#     serialize_rules = ('-user_books', '-authors', '-users', '-books.genres','-books.liked_books', '-books.authors', '-books', '-genres.books')

#     id = db.Column(db.Integer, primary_key=True)
#     genre = db.Column(db.String)
#     created_at = db.Column(db.DateTime, server_default = db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate = db.func.now())

#     genre_books =  db.relationship("Book", backref = "genre")

# class User(db.Model, SerializerMixin):
#     __tablename__ = 'users'

#     serialize_rules = ('-user_books', "-liked_books.user", '-liked_books.book')

#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String)
#     password = db.Column(db.String)
#     full_name = db.Column(db.String)
#     created_at = db.Column(db.DateTime, server_default = db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate = db.func.now())


#     liked_books = db.relationship("UserBook", backref = "user")

# class UserBook(db.Model, SerializerMixin):
#     __tablename__ = 'user_books'

#     serialize_rules = ('-users.liked_books', '-books.liked_books')

#     id = db.Column(db.Integer, primary_key=True)
#     created_at = db.Column(db.DateTime, server_default = db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
#     book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

# class Book(db.Model, SerializerMixin):
#     __tablename__ = 'books'

#     serialize_rules = ('-user_books', "-liked_books", '-author.books', '-author.biography')

#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String)
#     price = db.Column(db.Float)  #use random float number snap to 2
#     isbn = db.Column(db.Integer)
#     likes = db.Column(db.Integer)
#     image = db.Column(db.String)
#     created_at = db.Column(db.DateTime, server_default = db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    
#     genre_id = db.Column(db.Integer, db.ForeignKey("genres.id"))
#     author_id = db.Column(db.Integer, db.ForeignKey('authors.id'))

#     liked_books = db.relationship("UserBook", backref = "book")


