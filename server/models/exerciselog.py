#  exerciselog.py
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

from config import db

# Models go here!
class ExerciseLog(db.Model, SerializerMixin):
    __tablename__ = "exercise_logs"
    id = db.Column(db.Integer, primary_key=True)
    # todo ondelete when a workoutsession is deleted, all its children are deleted check workout session
    # use table name!
    
    workout_session_id = db.Column(db.Integer, db.ForeignKey("workout_sessions.id", ondelete='CASCADE'))
    exercise_id = db.Column(db.Integer, db.ForeignKey("exercises.id", ondelete='CASCADE'))
    reps = db.Column(db.Integer)
    sets = db.Column(db.Integer)
    weight = db.Column(db.Float)
    time = db.Column(db.Float)

    # ! Relationships
    # establishing a through relationship
    # you're getting exercises through exercise_logs
    workout_session = db.relationship("WorkoutSession", back_populates="exercise_logs")
    exercise = db.relationship("Exercise", back_populates="exercise_logs")
    serialize_rules = ("-workout_session.exercise_logs", "-exercise.exercise_logs", )