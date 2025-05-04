# exerciseroute.py
from config import db, api, app
from flask import request, jsonify
from flask_restful import Resource
from models import Exercise, ExerciseLog, WorkoutSession
import json


# Resource passed in turns it into a super class
class ExercisesResource(Resource):
    def get(self, exercise_id=None):
        try:
            exercises = Exercise.query.all()
            if not exercises:
                return {'message': 'No exercises found'}, 404
            return[exercise.to_dict() for exercise in exercises], 200
        
        # handles errors gracefully- its keeping the raw error from showing on the front end
        except Exception as e: 
            return {'Error': f'An error occured while fetching exercises {str(e)}'}, 500

    def post(self):
        # try and except 
        try:
            # to retrieve the data from the form from the user
            # the request is the data from the form inputted by the user
            #  .get_json() extracts the json data from the request
            data = request.get_json()

            # .get() extracts specific attributes
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
    # def get_by_id
    def patch(self, exercise_id):
        try:
            # validate that the exercise we want to update exists
            # if not update_exercise:
            #     return {'Error': 'Exercise not found'}, 404
            
            update_exercise = Exercise.query.filter_by(id=exercise_id).first()

            # the request we reeived from teh front-end
            # the patch request will only send data the user wants to update
            data = request.get_json()


            if 'name' in data:
                update_exercise.name = data['name']
            if 'description' in data:
                update_exercise.description = data['description']
            if 'muscle_group' in data:
                update_exercise.muscle_group = data['muscle_group']
            if 'equipment' in data:
                update_exercise.equipment = data['equipment']
            if 'category' in data:
                update_exercise.category = data['category']

            # db.session.add(update_exercise)
            db.session.commit()

            return update_exercise.to_dict(), 200
        
        except Exception as e: 
            db.session.rollback()
            return {'Error': f'Exercise update unsuccessful {str(e)}'}, 500
    
    def delete(self, exercise_id):

        try:
            delete_exercise = Exercise.query.filter_by(id=exercise_id).first()

            if not delete_exercise:
                return {'Error': 'Exercise not found'}, 404
            db.session.delete(delete_exercise)
            db.session.commit()

            return {'':''}, 204

        except Exception as e:
            return {'Error': f'Exercise deletion unsuccessful {str(e)}'}, 500








