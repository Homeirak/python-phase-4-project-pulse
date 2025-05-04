# these will have the response to the REACT (GET, POST,PATCH, DELETE) requests

# workoutsessionroute.py
from config import db, api, app
from flask import request, jsonify
from flask_restful import Resource
from models import Exercise, ExerciseLog, WorkoutSession
from datetime import datetime
import json
from datetime import date

# GET/POST only

class ExerciseLogResource(Resource):
    def get(self, exercise_id=None):
        try:
            exercise_logs = ExerciseLog.query.all()
         
            if not exercise_logs:
                return {'message': 'No exercise logs found'}, 404
            return[exercise_log.to_dict() for exercise_log in exercise_logs], 200

        except Exception as e:
            return {'Error': f'An error occured while fetching exercise logs {str(e)}'}, 500
        
    def post(self):
        try:
            data = request.get_json()

            workout_session_id = data.get('workout_session_id')
            exercise_id = data.get('exercise_id')
            reps = data.get('reps')
            sets = data.get('sets')
            weight = data.get('weight')
            time = data.get('time')

            if not workout_session_id or not exercise_id:
                return {'Error': 'workout_session_id and exercise_id are required'}, 400

            new_exercise_log = ExerciseLog(
                workout_session_id=workout_session_id,
                exercise_id=exercise_id,
                reps=reps,
                sets=sets,
                weight=weight,
                time=time
            )

            db.session.add(new_exercise_log)
            db.session.commit()

            return new_exercise_log.to_dict(), 201

        except Exception as e:
            db.session.rollback()
            return {'Error': f'Unable to create exercise log: {str(e)}'}, 500