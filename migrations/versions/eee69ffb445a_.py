"""empty message

Revision ID: eee69ffb445a
Revises: 1cf982b7645d
Create Date: 2022-08-05 20:55:04.139831

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eee69ffb445a'
down_revision = '1cf982b7645d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'Favorites', ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'Favorites', type_='unique')
    # ### end Alembic commands ###
