import dotenv
import os
import pytz

from datetime import datetime, timezone
from typing import Annotated
from fastapi import APIRouter, Body, Response
from datetime import datetime, timezone
from sqlmodel import select

from app.dependencies.mail import send_email
from app.dependencies.db import SessionDep
from app.dependencies.pwd import VerifyText, HashText

from app.models.models import ResetPasswordToken, User

from app.routes.auth.reset_password.resetPassword_dto import ResetPasswordRouter, ResetPasswordRouterResponse, ResetPasswordRouterErrorResponse

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
        "/reset-password",
        summary="A route handler for authenticating user",
        description="This route will reset-password and valid given info with correct schema to it",
        responses={
            200: {
                "model": ResetPasswordRouterResponse
            },
            400: {
                "model": ResetPasswordRouterErrorResponse
            },
            401: {
                "model": ResetPasswordRouterErrorResponse
            },
        }
)
def handle_resetPassword(resetPasswordRouter: Annotated[ResetPasswordRouter, Body()], session: SessionDep, response: Response):
    if VerifyText(WEB_HOOK_SECRET_KEY, resetPasswordRouter.web_hook_token) is False:
        response.status_code = 401
        return ResetPasswordRouterErrorResponse(
            detail="Unkown Error occured.",
            timestamp=datetime.now(timezone.utc)
        )
    find_token = session.exec(select(ResetPasswordToken).where(ResetPasswordToken.token == resetPasswordRouter.token)).first()
    if find_token is None:
        response.status_code = 401
        return ResetPasswordRouterErrorResponse(
            detail="Invalid token.",
            timestamp=datetime.now(timezone.utc)
        )
    if find_token:
        utc=pytz.UTC
        current_expires = find_token.expires_at.replace(tzinfo=utc)
        current_datetime = datetime.now(timezone.utc).replace(tzinfo=utc)
        isExpired = current_expires < current_datetime
        if isExpired == True:
            response.status_code = 401
            session.delete(find_token)
            session.commit()
            return ResetPasswordRouterErrorResponse(
                detail="Token is expired.",
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
        find_user_id = session.exec(select(User).where(User.id == find_token.user_id)).first()
        if find_user_id == None:
            session.delete(find_token)
            session.commit()
            response.status_code = 401
            return ResetPasswordRouterErrorResponse(
                detail="Cannot find user.",
                timestamp=datetime.now(timezone.utc)
            )
        if VerifyText(resetPasswordRouter.password, find_user_id.password) == True:
            response.status_code = 401
            return ResetPasswordRouterErrorResponse(
                detail="Cannot set same password twice.",
                timestamp=datetime.now(timezone.utc)
            )
        session.delete(find_token)
        session.commit()
        hashed_password = HashText(resetPasswordRouter.password)
        find_user_id.password = hashed_password
        find_user_id.updated_at = datetime.now(timezone.utc)
        session.add(find_user_id)
        session.commit()
        session.refresh(find_user_id)
        response.status_code = 200
        return ResetPasswordRouterResponse(
            detail="Password has been reset successfuly.",
            timestamp=datetime.now(timezone.utc)
        )