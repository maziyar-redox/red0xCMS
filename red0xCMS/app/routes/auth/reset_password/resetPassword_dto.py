from datetime import datetime, timezone
from pydantic import BaseModel
from sqlmodel import SQLModel, Field

class ResetPasswordRouter(SQLModel):
    web_hook_token: str = Field()
    password: str = Field(min_length=8, max_length=64)
    token: str = Field(min_length=128, max_length=512)

class ResetPasswordRouterResponse(SQLModel):
    detail: str = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))

class ResetPasswordRouterErrorResponse(BaseModel):
    detail: str = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))