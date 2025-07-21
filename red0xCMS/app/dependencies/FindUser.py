from sqlmodel import select
from uuid import UUID

from app.dependencies.db import SessionDep
from app.models.models import User
from app.dependencies.email_validate import ValidateEmail

def FindUserByEmail(session: SessionDep, user_input: str) -> User | None:
    if "@" in user_input and "." in user_input:
        if ValidateEmail(user_input) == True:
            find_user_email = session.exec(select(User).where(User.email == user_input)).first()
            if find_user_email is None:
                return None
            else:
                return find_user_email
        else:
            return None
    else:
        return None

def FindUserByUUID(session: SessionDep, user_input: UUID) -> User | None:
    try:
        find_user_id = session.exec(select(User).where(User.id == user_input)).first()
        if find_user_id is None:
            return None
        return find_user_id
    except ValueError:
        return None

def FindUserByUsername(session: SessionDep, user_input: str) -> User | None:
    find_user_username = session.exec(select(User).where(User.username == user_input)).first()
    if find_user_username is None:
        return None
    return find_user_username