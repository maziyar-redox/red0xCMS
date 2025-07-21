import dotenv
import os
import pytz

from sqlmodel import select, desc
from datetime import datetime, timedelta, timezone
from typing import Annotated
from fastapi import APIRouter, Body, Response
from datetime import datetime, timezone

from app.dependencies.db import SessionDep
from app.dependencies.pwd import VerifyText
from app.dependencies.mail import send_email
from app.dependencies.jwt import SignJwt

from app.dependencies.FindUser import FindUserByEmail

from app.models.models import ResetPasswordToken

from app.routes.auth.forgot_password.forgotPassword_dto import ForgotPasswordRouter, ForgotPasswordRouterResponse, ForgotPasswordRouterErrorResponse

dotenv.load_dotenv()

WEB_HOOK_SECRET_KEY = os.getenv("WEB_HOOK_SECRET_KEY", "")
RESET_PASSWORD_PRIVATE_KEY = os.getenv("RESET_PASSWORD_PRIVATE_KEY", "")
RESET_PASSWORD_PUBLIC_KEY = os.getenv("RESET_PASSWORD_PUBLIC_KEY", "")
RESET_PASSWORD_ALGORITHM = os.getenv("RESET_PASSWORD_ALGORITHM", "")

router = APIRouter(
    prefix="/v1/api/auth",
    tags=["Auth"],
)

@router.post(
        "/forgot-password",
        summary="A route handler for authenticating user",
        description="This route will forgot-password and valid given info with correct schema to it",
        responses={
            200: {
                "model": ForgotPasswordRouterResponse
            },
            400: {
                "model": ForgotPasswordRouterErrorResponse
            },
            401: {
                "model": ForgotPasswordRouterErrorResponse
            },
        }
)
def handle_forgotPassword(forgotPasswordRouter: Annotated[ForgotPasswordRouter, Body()], session: SessionDep, response: Response):
    if VerifyText(WEB_HOOK_SECRET_KEY, forgotPasswordRouter.web_hook_token) is False:
        response.status_code = 401
        return ForgotPasswordRouterErrorResponse(
            detail="Unkown Error occured.",
            timestamp=datetime.now(timezone.utc)
        )
    find_user = FindUserByEmail(session=session, user_input=forgotPasswordRouter.username)
    if find_user == None:
        response.status_code = 401
        return ForgotPasswordRouterErrorResponse(
            detail="Cannot find user.",
            timestamp=datetime.now(timezone.utc)
        )
    if find_user:
        find_token = session.exec(
            select(ResetPasswordToken)
            .where(ResetPasswordToken.user_id == find_user.id)
            .order_by(desc(ResetPasswordToken.expires_at))
            .limit(1)
        ).first()
        if find_token:
            utc=pytz.UTC
            current_expires = find_token.expires_at.replace(tzinfo=utc)
            current_datetime = datetime.now(timezone.utc).replace(tzinfo=utc)
            isExpired = current_expires < current_datetime
            if isExpired == False:
                response.status_code = 401
                return ForgotPasswordRouterErrorResponse(
                    detail="Another link is already sent to your email.",
                    timestamp=datetime.now(timezone.utc)
                )
        """ sendMailStatus = send_email(forgotPasswordRouter.username, "Reset Password Link", "RESET")
        if sendMailStatus == True:
            response.status_code = 200
            return ForgotPasswordRouterResponse(
                detail="Password reset link has been sent.",
                timestamp=datetime.now(timezone.utc)
            )
        else:
            response.status_code = 401
            return ForgotPasswordRouterErrorResponse(
                detail="There was an error while sending email.",
                timestamp=datetime.now(timezone.utc)
            ) """
        expiration_time = datetime.now(timezone.utc) + timedelta(minutes=30)
        jwtClaim = {
            "id": f"{find_user.id}",
            "username": forgotPasswordRouter.username,
            "exp": expiration_time
        }
        jwtToken = SignJwt(RESET_PASSWORD_PRIVATE_KEY, RESET_PASSWORD_PUBLIC_KEY, jwtClaim, RESET_PASSWORD_ALGORITHM)
        setResetPassword = ResetPasswordToken(
            user=find_user,
            token=jwtToken,
            expires_at=expiration_time
        )
        session.add(setResetPassword)
        session.commit()
        session.refresh(setResetPassword)
        response.status_code = 200
        return ForgotPasswordRouterResponse(
            detail="Password reset link has been sent.",
            timestamp=datetime.now(timezone.utc)
        )