import os

from typing import Annotated, Union
from fastapi import APIRouter, Body, Response
from datetime import datetime, timezone

from app.dependencies.db import SessionDep
from app.dependencies.pwd import VerifyText

from app.dependencies.FindUser import FindUserByUUID

from app.routes.user.profile.profile_dto import UserProfileRouterErrorResponse, ActionEnum, UserProfileRouterResponse, UpdateProfilePayload

WEB_HOOK_SECRET_KEY = os.getenv("WEB_HOOK_SECRET_KEY", "")

PayloadInstance = Union[UpdateProfilePayload]

router = APIRouter(
    prefix="/v1/api/user",
    tags=["Settings"],
)

@router.post(
        "/profile/{action}",
        summary="A route handler for getting user",
        description="This route will return user schema",
        responses={
            200: {
                "model": UserProfileRouterResponse
            },
            400: {
                "model": UserProfileRouterErrorResponse
            },
            401: {
                "model": UserProfileRouterErrorResponse
            },
        }
)
async def handle_profile(
    action: Annotated[ActionEnum, str],
    payload: Annotated[PayloadInstance, Body()],
    session: SessionDep,
    response: Response
):
    if VerifyText(WEB_HOOK_SECRET_KEY, payload.web_hook_token) is False:
        response.status_code = 401
        return UserProfileRouterErrorResponse(
            detail="Unkown Error occured.",
            timestamp=datetime.now(timezone.utc)
        )
    if action == ActionEnum.UPDATE_PROFILE and isinstance(payload, UpdateProfilePayload):
        find_user = FindUserByUUID(session=session, user_input=payload.id)
        if find_user == None:
            response.status_code = 401
            return UserProfileRouterErrorResponse(
                detail="Cannot find user.",
                timestamp=datetime.now(timezone.utc)
            )
        find_user.first_name = payload.first_name
        find_user.last_name = payload.last_name
        find_user.username = payload.username
        find_user.updated_at = datetime.now(timezone.utc)
        session.add(find_user)
        session.commit()
        session.refresh(find_user)
        response.status_code = 200
        return UserProfileRouterResponse(
            detail=True,
            timestamp=datetime.now(timezone.utc)
        )
    else:
        return UserProfileRouterResponse(
            detail=False,
            timestamp=datetime.now(timezone.utc)
        )