from sqlmodel import SQLModel, Field
from datetime import datetime, timezone
from pydantic import EmailStr

class RegisterUserRouter(SQLModel):
    web_hook_token: str = Field()
    first_name: str = Field(max_length=12, min_length=3)
    last_name: str = Field(max_length=12, min_length=3)
    email: EmailStr = Field(max_length=32, min_length=6)
    username: str = Field(max_length=8, min_length=4)
    password: str = Field(min_length=8, max_length=64)

class RegisterUserRouterResponse(SQLModel):
    detail: str = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))

class RegisterUserRouterErrorResponse(SQLModel):
    detail: str = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))