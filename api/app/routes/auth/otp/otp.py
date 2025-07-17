import dotenv
import os
import pytz
import random

from sqlmodel import select, desc
from typing import Annotated
from fastapi import APIRouter, Body, Response
from datetime import datetime, timezone, timedelta

from app.dependencies.db import SessionDep
from app.dependencies.pwd import VerifyText

from app.models.models import OtpToken

from app.dependencies.FindUser import FindUserByEmail

from app.routes.auth.otp.otp_dto import OtpUserRouter, OtpUserRouterResponse, OtpUserRouterErrorResponse, ResendOtpUserRouter, ResendOtpUserRouterResponse, ResendOtpUserRouterErrorResponse

dotenv.load_dotenv()

WEB_HOOK_SECRET_KEY = os.getenv("WEB_HOOK_SECRET_KEY", "")

router = APIRouter(
    prefix="/v1/api/auth",
    tags=["Auth"],
)

@router.post(
        "/resend-otp",
        summary="A route handler for authenticating user",
        description="This route will resend otp and valid given info with correct schema to it",
        responses={
            200: {
                "model": ResendOtpUserRouterResponse
            },
            400: {
                "model": ResendOtpUserRouterErrorResponse
            },
            401: {
                "model": ResendOtpUserRouterErrorResponse
            },
        }
)
def handle_resend_otp(resendOtpUserRouter: Annotated[ResendOtpUserRouter, Body()], session: SessionDep, response: Response):
    if VerifyText(WEB_HOOK_SECRET_KEY, resendOtpUserRouter.web_hook_token) is False:
        response.status_code = 401
        return ResendOtpUserRouterErrorResponse(
            detail="Unkown Error occured.",
            timestamp=datetime.now(timezone.utc)
        )
    find_user = FindUserByEmail(session=session, user_input=resendOtpUserRouter.username)
    if find_user == None:
        response.status_code = 401
        return ResendOtpUserRouterErrorResponse(
            detail="Unknown error occured.",
            timestamp=datetime.now(timezone.utc)
        )
    if find_user and find_user.is_guard == True:
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
                return ResendOtpUserRouterErrorResponse(
                    detail="Another token is already has been sent to your email.",
                    timestamp=datetime.now(timezone.utc)
                )
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
        response.status_code = 200
        return ResendOtpUserRouterResponse(
            status=True,
            timestamp=datetime.now(timezone.utc),
        )
    return ResendOtpUserRouterErrorResponse(
        detail="Unkown error happend.",
        timestamp=datetime.now(timezone.utc)
    )

@router.post(
        "/otp",
        summary="A route handler for authenticating user",
        description="This route will otp and valid given info with correct schema to it",
        responses={
            200: {
                "model": OtpUserRouterResponse
            },
            400: {
                "model": OtpUserRouterErrorResponse
            },
            401: {
                "model": OtpUserRouterErrorResponse
            },
        }
)
def handle_otp(otpUserRouter: Annotated[OtpUserRouter, Body()], session: SessionDep, response: Response):
    if VerifyText(WEB_HOOK_SECRET_KEY, otpUserRouter.web_hook_token) is False:
        response.status_code = 401
        return OtpUserRouterErrorResponse(
            detail="Unkown Error occured.",
            timestamp=datetime.now(timezone.utc)
        )
    find_user = FindUserByEmail(session=session, user_input=otpUserRouter.username)
    if find_user == None:
        response.status_code = 401
        return OtpUserRouterErrorResponse(
            detail="Unknown error occured.",
            timestamp=datetime.now(timezone.utc)
        )
    if find_user and find_user.is_guard == True:
        find_token = find_user.otp_token[-1]
        if find_token:
            if find_token.token != otpUserRouter.otp:
                response.status_code = 401
                return OtpUserRouterErrorResponse(
                    detail="Invalid token. 12",
                    timestamp=datetime.now(timezone.utc)
                )
            utc=pytz.UTC
            current_expires = find_token.expires_at.replace(tzinfo=utc)
            current_datetime = datetime.now(timezone.utc).replace(tzinfo=utc)
            isExpired = current_expires < current_datetime
            if isExpired == True:
                response.status_code = 401
                return OtpUserRouterErrorResponse(
                    detail="Invalid token. 13",
                    timestamp=datetime.now(timezone.utc)
                )
            if find_token.token == otpUserRouter.otp:
                session.delete(find_token)
                session.commit()
                response.status_code = 200
                return OtpUserRouterResponse(
                    id=find_user.id,
                    first_name=find_user.first_name,
                    last_name=find_user.last_name,
                    email=find_user.email,
                    profile_pic=find_user.profile_pic,
                    username=find_user.username,
                    timestamp=datetime.now(timezone.utc),
                )
        if find_token == None:
            response.status_code = 401
            return OtpUserRouterErrorResponse(
                detail="Unkown error happend.",
                timestamp=datetime.now(timezone.utc)
            )
    response.status_code = 401
    return OtpUserRouterErrorResponse(
        detail="Unkown error happend.",
        timestamp=datetime.now(timezone.utc)
    )