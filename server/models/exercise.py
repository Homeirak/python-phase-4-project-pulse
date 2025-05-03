# exercise.py
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin



from config import db

# Models go here!
class Exercise(db.Model, SerializerMixin):
    __tablename__= "exercises"
    
    id = db.Column(db.Integer, primary_key=True)
    # todo lookup diffference between string and text
    # ! cannot be empty
    name = db.Column(db.String, nullable=False)
    # can be empty
    description = db.Column(db.String, nullable=True)
    # ! cannot be empty
    muscle_group= db.Column(db.String, nullable=False)
    # can be empty
    equipment= db.Column(db.String, nullable=True)
    # ! cannot be empty because our filter will be by category
    category= db.Column(db.String, nullable=False)

    # ! Relationships
    exercise_logs = db.relationship("ExerciseLog", back_populates="exercise", cascade="all, delete")
    serialize_rules = ("-exercise_logs.exercises", )

    # ! Do I want to add validations? 
    @validates('name')
    def validate_name(self, key, value):
        # if user enters extra spaces, .strip will delete the extra spaces before or after the name
        if not value or len(value.strip()) == 0:
            # ! check back re toast
            raise ValueError("Exercise name cannot be empty")
        return value.strip()