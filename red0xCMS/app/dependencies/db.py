from typing import Annotated
from fastapi import APIRouter, Depends
from sqlmodel import create_engine, Session, SQLModel

router = APIRouter()

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

@router.on_event("startup")
def on_startup():
    create_db_and_tables()