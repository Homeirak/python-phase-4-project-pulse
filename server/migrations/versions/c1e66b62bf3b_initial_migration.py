"""initial migration

Revision ID: c1e66b62bf3b
Revises: 
Create Date: 2025-05-02 17:48:02.615914

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c1e66b62bf3b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('exercises',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('muscle_group', sa.String(), nullable=False),
    sa.Column('equipment', sa.String(), nullable=True),
    sa.Column('category', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workout_sessions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('exercise_logs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('workout_session_id', sa.Integer(), nullable=True),
    sa.Column('exercise_id', sa.Integer(), nullable=True),
    sa.Column('reps', sa.Integer(), nullable=True),
    sa.Column('sets', sa.Integer(), nullable=True),
    sa.Column('weight', sa.Float(), nullable=True),
    sa.Column('time', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['exercise_id'], ['exercises.id'], name=op.f('fk_exercise_logs_exercise_id_exercises'), ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['workout_session_id'], ['workout_sessions.id'], name=op.f('fk_exercise_logs_workout_session_id_workout_sessions'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('exercise_logs')
    op.drop_table('workout_sessions')
    op.drop_table('exercises')
    # ### end Alembic commands ###
