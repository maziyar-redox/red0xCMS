import dotenv
import os
import random
import pytz

from sqlmodel import select, desc
from typing import Annotated
from fastapi import APIRouter, Body, Response
from datetime import datetime, timezone, timedelta

from app.dependencies.db import SessionDep
from app.dependencies.pwd import VerifyText

from app.models.models import OtpToken

from app.dependencies.FindUser import FindUserByEmail

from app.routes.auth.login.login_dto import LoginUserRouter, LoginUserRouterResponse, LoginUserRouterErrorResponse

dotenv.load_dotenv()

WEB_HOOK_SECRET_KEY = os.getenv("WEB_HOOK_SECRET_KEY", "")

router = APIRouter(
    prefix="/v1/api/auth",
    tags=["Auth"],
)

@router.post(
        "/login",
        summary="A route handler for authenticating user",
        description="This route will login and valid given info with correct schema to it",
        responses={
            200: {
                "model": LoginUserRouterResponse
            },
            400: {
                "model": LoginUserRouterErrorResponse
            },
            401: {
                "model": LoginUserRouterErrorResponse
            },
        }
)
def handle_login(loginUserRouter: Annotated[LoginUserRouter, Body()], session: SessionDep, response: Response):
    if VerifyText(WEB_HOOK_SECRET_KEY, loginUserRouter.web_hook_token) is False:
        response.status_code = 401
        return LoginUserRouterErrorResponse(
            detail="Unkown Error occured.",
            timestamp=datetime.now(timezone.utc)
        )
    find_user = FindUserByEmail(session=session, user_input=loginUserRouter.username)
    if find_user == None:
        response.status_code = 401
        return LoginUserRouterErrorResponse(
            detail="Cannot find user.",
            timestamp=datetime.now(timezone.utc)
        )
    if VerifyText(loginUserRouter.password, find_user.password) is False:
        response.status_code = 401
        return LoginUserRouterErrorResponse(
            detail="Incorrect password!",
            timestamp=datetime.now(timezone.utc)
        )
    if find_user:
        if find_user.is_guard == True:
            find_token = session.exec(
                select(OtpToken)
                .where(OtpToken.user_id == find_user.id)
                .order_by(desc(OtpToken.expires_at))
                .limit(1)
            ).first()
            if find_token:
                utc=pytz.UTC
                current_expires = find_token.expires_at.replace(tzinfo=utc)
                current_datetime = datetime.now(timezone.utc).replace(tzinfo=utc)
                isExpired = current_expires < current_datetime
                if isExpired == False:
                    response.status_code = 401
                    return LoginUserRouterErrorResponse(
                        detail="Please login after a few minutes.",
                        timestamp=datetime.now(timezone.utc)
                    )
            response.status_code = 200
            expiration_time = datetime.now(timezone.utc) + timedelta(minutes=2)
            createOtpModel = OtpToken(
                token=random.randint(100000, 999999),
                created_at=datetime.now(timezone.utc),
                expires_at=expiration_time,
                user=find_user
            )
            session.add(createOtpModel)
            session.commit()
            session.refresh(createOtpModel)
            return LoginUserRouterResponse(
                id=find_user.id,
                first_name=find_user.first_name,
                last_name=find_user.last_name,
                email=find_user.email,
                profile_pic=find_user.profile_pic,
                username=find_user.username,
                timestamp=datetime.now(timezone.utc),
                is_otp=find_user.is_guard
            )
        if find_user.is_guard == False:
            response.status_code = 200
            return LoginUserRouterResponse(
                id=find_user.id,
                first_name=find_user.first_name,
                last_name=find_user.last_name,
                email=find_user.email,
                profile_pic=find_user.profile_pic,
                username=find_user.username,
                timestamp=datetime.now(timezone.utc),
                is_otp=find_user.is_guard
            )