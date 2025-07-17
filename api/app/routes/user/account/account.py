import os

from typing import Annotated, Union
from fastapi import APIRouter, Body, Response
from datetime import datetime, timezone

from app.dependencies.db import SessionDep
from app.dependencies.pwd import VerifyText

from app.dependencies.FindUser import FindUserByUUID

from app.routes.user.account.account_dto import UserAccountRouterErrorResponse, ActionEnum, TwoFAStatePayload, ChangePasswordPayload, UserAccountRouterResponse

WEB_HOOK_SECRET_KEY = os.getenv("WEB_HOOK_SECRET_KEY", "")

PayloadInstance = Union[TwoFAStatePayload, ChangePasswordPayload]

router = APIRouter(
    prefix="/v1/api/user",
    tags=["Settings"],
)

@router.post(
        "/account/{action}",
        summary="A route handler for getting user",
        description="This route will return user schema",
        responses={
            200: {
                "model": UserAccountRouterResponse
            },
            400: {
                "model": UserAccountRouterErrorResponse
            },
            401: {
                "model": UserAccountRouterErrorResponse
            },
        }
)
async def handle_account(
    action: Annotated[ActionEnum, str],
    payload: Annotated[PayloadInstance, Body()],
    session: SessionDep,
    response: Response
):
    if VerifyText(WEB_HOOK_SECRET_KEY, payload.web_hook_token) is False:
        response.status_code = 401
        return UserAccountRouterErrorResponse(
            detail="Unkown Error occured.",
            timestamp=datetime.now(timezone.utc)
        )
    if action == ActionEnum.TWOFA_STATE and isinstance(payload, TwoFAStatePayload):
        find_user = FindUserByUUID(session=session, user_input=payload.id)
        if find_user == None:
            response.status_code = 401
            return UserAccountRouterErrorResponse(
                detail="Cannot find user.",
                timestamp=datetime.now(timezone.utc)
            )
        find_user.is_guard = payload.is_guard
        session.add(find_user)
        session.commit()
        session.refresh(find_user)
        return UserAccountRouterResponse(
            detail=True,
            timestamp=datetime.now(timezone.utc)
        )
    elif action == ActionEnum.CHANGE_PASSWORD and isinstance(payload, ChangePasswordPayload):
        return UserAccountRouterResponse(
            detail=False,
            timestamp=datetime.now(timezone.utc)
        )
    else:
        return UserAccountRouterResponse(
            detail=False,
            timestamp=datetime.now(timezone.utc)
        )