import os
import dotenv

from typing import Annotated
from fastapi import APIRouter, Body, Response
from sqlmodel import select
from datetime import datetime, timezone

from app.dependencies.db import SessionDep
from app.dependencies.email_validate import ValidateEmail
from app.dependencies.pwd import VerifyText, HashText

from app.models.models import User

from app.routes.auth.register.register_dto import RegisterUserRouter, RegisterUserRouterResponse, RegisterUserRouterErrorResponse

dotenv.load_dotenv()

WEB_HOOK_SECRET_KEY = os.getenv("WEB_HOOK_SECRET_KEY", "")

router = APIRouter(
    prefix="/v1/api/auth",
    tags=["Auth"],
)

@router.post(
        "/register",
        responses={
            200: {
                "model": RegisterUserRouterResponse
            },
            400: {
                "model": RegisterUserRouterErrorResponse
            },
            401: {
                "model": RegisterUserRouterErrorResponse
            },
        },
        summary="A route handler for registering user",
        description="This route will register and valid given info with correct schema to it"
)
def handle_register(registerUserRouter: Annotated[RegisterUserRouter, Body()], session: SessionDep, response: Response):
    if VerifyText(WEB_HOOK_SECRET_KEY, registerUserRouter.web_hook_token) is False:
        response.status_code = 401
        return RegisterUserRouterErrorResponse(
            detail="Unkown Error occured.",
            timestamp=datetime.now(timezone.utc)
        )
    if ValidateEmail(registerUserRouter.email) is False:
        response.status_code = 400
        return RegisterUserRouterErrorResponse(
            detail="Enter a valid email",
            timestamp=datetime.now(timezone.utc)
        )
    existing_email = session.exec(select(User).where(User.email == registerUserRouter.email)).first()
    if existing_email:
        response.status_code = 400
        return RegisterUserRouterErrorResponse(
            detail="Email is exist. try another one.",
            timestamp=datetime.now(timezone.utc)
        )
    existing_username = session.exec(select(User).where(User.username == registerUserRouter.username)).first()
    if existing_username:
        response.status_code = 400
        return RegisterUserRouterErrorResponse(
            detail="A user already registered with this username.",
            timestamp=datetime.now(timezone.utc)
        )
    CreateUserModel = User(**registerUserRouter.model_dump())
    hashed_password = HashText(CreateUserModel.password)
    CreateUserModel.password = hashed_password
    session.add(CreateUserModel)
    session.commit()
    session.refresh(CreateUserModel)
    response.status_code = 201
    return RegisterUserRouterResponse(
        detail="User successfully registered.",
        timestamp=datetime.now(timezone.utc)
    )