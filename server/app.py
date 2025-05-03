#!/usr/bin/env python3
# app.py
# from models import *
from models.exercise import Exercise
from models.workoutsession import WorkoutSession
from models.exerciselog import ExerciseLog

# routes
from routes.exerciseroute import ExercisesResource

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'

# GET and POST always go in the same endppoint, convention to make endpoint plural
api.add_resource(ExercisesResource, '/exercises')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

