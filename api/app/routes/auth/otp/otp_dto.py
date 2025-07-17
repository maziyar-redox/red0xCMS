from datetime import datetime, timezone
from pydantic import BaseModel, EmailStr
from sqlmodel import SQLModel, Field
from uuid import UUID

class OtpUserRouter(SQLModel):
    web_hook_token: str = Field()
    username: EmailStr = Field(max_length=32, min_length=6)
    otp: int = Field()

class OtpUserRouterResponse(SQLModel):
    id: UUID = Field()
    first_name: str = Field()
    last_name: str = Field()
    email: str = Field()
    username: str = Field()
    profile_pic: str | None = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))

class OtpUserRouterErrorResponse(BaseModel):
    detail: str = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))

class ResendOtpUserRouter(SQLModel):
    web_hook_token: str = Field()
    username: EmailStr = Field(max_length=32, min_length=6)

class ResendOtpUserRouterResponse(SQLModel):
    status: bool = Field(nullable=False, default=False)
    timestamp: datetime = Field(default=datetime.now(timezone.utc))

class ResendOtpUserRouterErrorResponse(BaseModel):
    detail: str = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))