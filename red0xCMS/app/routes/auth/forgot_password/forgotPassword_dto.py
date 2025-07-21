from datetime import datetime, timezone
from pydantic import BaseModel, EmailStr
from sqlmodel import SQLModel, Field

class ForgotPasswordRouter(SQLModel):
    web_hook_token: str = Field()
    username: EmailStr = Field(max_length=32, min_length=6)

class ForgotPasswordRouterResponse(SQLModel):
    detail: str = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))

class ForgotPasswordRouterErrorResponse(BaseModel):
    detail: str = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))