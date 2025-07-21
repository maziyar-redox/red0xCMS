from datetime import datetime, timezone
from pydantic import BaseModel
from sqlmodel import SQLModel, Field
from uuid import UUID

class UserRouter(SQLModel):
    web_hook_token: str = Field()
    id: UUID = Field()

class UserRouterResponse(SQLModel):
    id: UUID = Field()
    first_name: str = Field()
    last_name: str = Field()
    email: str = Field()
    username: str = Field()
    profile_pic: str | None = Field()
    is_guard: bool = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))

class UserRouterErrorResponse(BaseModel):
    detail: str = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))