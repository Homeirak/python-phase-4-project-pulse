from config import db, api, app
from flask import request
from flask_restful import Resource
from models import WorkoutSession
from datetime import datetime

class WorkoutSessionResource(Resource):
    def get(self, exercise_id=None):
        try:
            workout_sessions = WorkoutSession.query.all()

            if not workout_sessions:
                return {'message': 'No workout sessions found'}, 404

            return [ws.to_dict() for ws in workout_sessions], 200

        except Exception as e:
            return {'Error': f'An error occurred while fetching workout sessions: {str(e)}'}, 500

    def post(self):
        try:
            data = request.get_json()

            name = data.get('name')
            date_str = data.get('date')

            if not date_str:
                return {'Error': 'Date is required'}, 400

            # Convert date string (ISO 8601) to Python datetime object
            date_obj = datetime.fromisoformat(date_str)

            new_workout_session = WorkoutSession(
                name=name,
                date=date_obj
            )

            db.session.add(new_workout_session)
            db.session.commit()

            return new_workout_session.to_dict(), 201

        except Exception as e:
            db.session.rollback()
            return {'Error': f'Unable to create workout session: {str(e)}'}, 500
