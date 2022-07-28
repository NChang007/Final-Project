"""empty message

Revision ID: 735eb8d47bca
Revises: fbbab83f1d7d
Create Date: 2022-07-27 19:44:09.495554

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '735eb8d47bca'
down_revision = 'fbbab83f1d7d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('name', sa.String(length=256), nullable=True))
    op.drop_column('user', 'is_active')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
    op.drop_column('user', 'name')
    # ### end Alembic commands ###
