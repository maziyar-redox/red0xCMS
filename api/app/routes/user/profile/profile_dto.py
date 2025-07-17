from enum import Enum
from datetime import datetime, timezone
from pydantic import BaseModel, EmailStr
from sqlmodel import Field
from uuid import UUID

class ActionEnum(str, Enum):
    UPDATE_PROFILE = "update_profile"

class UpdateProfilePayload(BaseModel):
    web_hook_token: str = Field()
    id: UUID = Field(nullable=False)
    username: str = Field(nullable=False, max_length=8, min_length=4)
    first_name: str = Field(max_length=12, min_length=3)
    last_name: str = Field(max_length=12, min_length=3)

class UserProfileRouterResponse(BaseModel):
    detail: bool = Field(nullable=False)
    timestamp: datetime = Field(default=datetime.now(timezone.utc))

class UserProfileRouterErrorResponse(BaseModel):
    detail: str = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))