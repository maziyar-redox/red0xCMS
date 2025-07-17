from fastapi import FastAPI

from app.dependencies import db

from app.routes.auth.login import login
from app.routes.auth.register import register
from app.routes.auth.user import user
from app.routes.auth.forgot_password import forgotPassword
from app.routes.auth.reset_password import resetPassword
from app.routes.auth.otp import otp

from app.routes.user.account import account
from app.routes.user.profile import profile

app = FastAPI()

app.include_router(db.router)

app.include_router(login.router)
app.include_router(register.router)
app.include_router(user.router)
app.include_router(forgotPassword.router)
app.include_router(resetPassword.router)
app.include_router(otp.router)

app.include_router(account.router)
app.include_router(profile.router)