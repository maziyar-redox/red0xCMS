import os

from typing import Annotated
from fastapi import APIRouter, Body, Response
from datetime import datetime, timezone

from app.dependencies.db import SessionDep
from app.dependencies.pwd import VerifyText

from app.dependencies.FindUser import FindUserByUUID

from app.routes.auth.user.user_dto import UserRouter, UserRouterResponse, UserRouterErrorResponse

WEB_HOOK_SECRET_KEY = os.getenv("WEB_HOOK_SECRET_KEY", "")

router = APIRouter(
    prefix="/v1/api/auth",
    tags=["User"],
)

@router.post(
        "/user",
        summary="A route handler for getting user",
        description="This route will return user schema",
        responses={
            200: {
                "model": UserRouterResponse
            },
            400: {
                "model": UserRouterErrorResponse
            },
            401: {
                "model": UserRouterErrorResponse
            },
        }
)
def handle_user(userRouter: Annotated[UserRouter, Body()], session: SessionDep, response: Response):
    if VerifyText(WEB_HOOK_SECRET_KEY, userRouter.web_hook_token) is False:
        response.status_code = 401
        return UserRouterErrorResponse(
            detail="Unkown Error occured.",
            timestamp=datetime.now(timezone.utc)
        )
    find_user = FindUserByUUID(session=session, user_input=userRouter.id)
    if find_user == None:
        response.status_code = 401
        return UserRouterErrorResponse(
            detail="Failed to find user, incorrect session.",
            timestamp=datetime.now(timezone.utc)
        )
    return UserRouterResponse(
        id=find_user.id,
        first_name=find_user.first_name,
        last_name=find_user.last_name,
        email=find_user.email,
        profile_pic=find_user.profile_pic,
        username=find_user.username,
        is_guard=find_user.is_guard,
        timestamp=datetime.now(timezone.utc)
    )