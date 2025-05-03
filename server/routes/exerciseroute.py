# exerciseroute.py
from config import db, api, app
from flask import request, jsonify
from flask_restful import Resource
from models import Exercise, ExerciseLog, WorkoutSession
from datetime import datetime
import json
import json
from datetime import date

class ExercisesResource(Resource):
    def get(self, exercise_id=None):
        try:
            exercises = Exercise.query.all()
            if not exercises:
                return {'message': 'No exercises found'}, 404
            return[exercise.to_dict() for exercise in exercises], 200
        
        except Exception as e: 
            return {'Error': f'An error occured while fetching exercises {str(e)}'}, 500

    def post(self):
        # try and except 
        try:
            # to retrieve the data from the form from the user
            # receiving the request from the front end - from the form data (in json)
            data = request.get_json()

            name = data.get('name')
            description = data.get('description')
            muscle_group = data.get('muscle_group')
            equipment = data.get('equipment')
            category = data.get('category')

            # if data submitted is bad/missing:
            # if not name or not muscle_group or not category:
            #     return {"error": "Name, muscle group, and category are required"}, 400
            # if data is good
            # create new instance of the class
            new_exercise = Exercise (
                name = name,
                description = description,
                muscle_group = muscle_group,
                equipment = equipment,
                category = category
            )
            # add and commit to database
            db.session.add(new_exercise)
            db.session.commit()

            # return newly created exercise to the front-end
            return new_exercise.to_dict(), 201      

        except Exception as e:
            # {str(e)} to format to a readable format in the browser
            return {'Error': f'Unable to create exercise {str(e)}'}, 500

class ExerciseIdResource(Resource):
    def patch(self, exercise_id):
        try:
            # validate that the exercise we want to update exists
            if not exercise_id: 
                return {'Error': f'Exercise not found'}, 404

        
        except Exception as e: 
            db.session.rollback()
            return {'Error': f'Exercise update unsuccessful {str(e)}'}, 500

