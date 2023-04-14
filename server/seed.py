#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc


# Remote library imports
from faker import Faker
from faker.providers import  profile, isbn, internet   
# Local imports
from app import app
from models import Comment, Update, User, Project, db

fake = Faker()
fake.add_provider(profile)
fake.add_provider(isbn)
fake.add_provider(internet)

def make_user():
    
    User.query.delete()

    users_obj = []

    for i in range(10):
    # for i in range(10):
        user = User(
            full_name= fake.name(),   
            email= fake.email(),
            username= fake.name(),
            biography= fake.text(),
            image_url = 'https://pbs.twimg.com/media/FcRhl13aIAEUT1u.jpg'
        )
        
        user.password_hash = user.username + 'password'

        users_obj.append(user)
    
    db.session.add_all(users_obj)
    db.session.commit()


def make_project():
    
    Project.query.delete()
  
    project_obj = [
        Project(title = "test project", likes = 2, image_url = 'https://pbs.twimg.com/media/EeFwGoCUYAEWRr6.png' ,description = "Lorem Ipsum" , creator = db.session.get(User,1).username, user_id = '1'),
        Project(title = "Other project", likes = 20, image_url = 'https://pbs.twimg.com/media/EeFwGoCUYAEWRr6.png' ,description = "Lorem Ipsum", creator = db.session.get(User,2).username, user_id = '2')
        ]
    
    db.session.add_all(project_obj)
    db.session.commit()


def make_comment():

    Comment.query.delete()

    comments_obj = []

    for i in range(20):
        comment = Comment(
            content = fake.text(),
            user_id = randint(1,10),
            update_id = randint(1,6)
        )

        comments_obj.append(comment)
    
    db.session.add_all(comments_obj)
    db.session.commit()

def make_update():
    Update.query.delete()

    update_obj = []

    for i in range(15):
        update = Update(
            notes = fake.text(),
            media_type = 'Painting',
            project_id = randint(1,2),
            likes = randint(0,42),
            title = fake.name(),
            image_url = 'https://pbs.twimg.com/media/EjPZDxeXkAAulRc.jpg'
        )

        update_obj.append(update)
    
    db.session.add_all(update_obj)
    db.session.commit()




if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        make_user()
        make_project()
        make_comment()
        make_update()
    

        project = db.session.get(Project,1)
        print(project)
        print(len(project.title))
        # print(len(Book.query.get(1).liked_books))

