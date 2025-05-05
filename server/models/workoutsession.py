#  workoutsession.py
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, DateTime
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

#!testcomment
#todo testcomment
#? testcomment
#* testcomment

from config import db

# Models go here!
# columns. validaions, and relationships
class WorkoutSession(db.Model, SerializerMixin):
    __tablename__='workout_sessions'

    id = db.Column(db.Integer, primary_key=True)
    # ? do I need to add a validation here to prevent old out of date dates?
    date = db.Column(db.DateTime, nullable=False)
    # table-level validation (can't be empty/null)
    name = db.Column(db.String(20), nullable=False)
    #! Relationships
    # this relationship is what we're not sending back
    exercise_logs = db.relationship("ExerciseLog", back_populates="workout_session", cascade="all, delete")
    # in this rule
    serialize_rules = ("-exercise_logs.workout_session",)

    @validates('name')
    def validate_name(self, key, value):
        # if user enters extra spaces, .strip will delete the extra spaces before or after the name
        if not value or len(value.strip()) == 0:
            # ! check back re toast
            raise ValueError("Workout name cannot be empty")
        return value.strip()
    


# M.
# validations:
# model-level
# table-level
# form-level