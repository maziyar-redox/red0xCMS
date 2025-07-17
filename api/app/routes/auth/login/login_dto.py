from datetime import datetime, timezone
from pydantic import BaseModel, EmailStr
from sqlmodel import SQLModel, Field
from uuid import UUID

class LoginUserRouter(SQLModel):
    web_hook_token: str = Field()
    username: EmailStr = Field(max_length=32, min_length=6)
    password: str = Field(min_length=8, max_length=64)

class LoginUserRouterResponse(SQLModel):
    id: UUID = Field()
    first_name: str = Field()
    last_name: str = Field()
    email: str = Field()
    username: str = Field()
    profile_pic: str | None = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))
    is_otp: bool = Field(default=False)

class LoginUserRouterErrorResponse(BaseModel):
    detail: str = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))