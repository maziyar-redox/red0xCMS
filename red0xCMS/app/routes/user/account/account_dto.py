from enum import Enum
from datetime import datetime, timezone
from pydantic import BaseModel
from sqlmodel import Field
from uuid import UUID

class ActionEnum(str, Enum):
    TWOFA_STATE = "twofa_state"
    CHANGE_PASSWORD = "change_password"
    """
    VERIFY_EMAIL = "verify_email"
    UPDATE_PROFILE = "update_profile" """

class TwoFAStatePayload(BaseModel):
    web_hook_token: str = Field()
    id: UUID = Field(nullable=False)
    is_guard: bool = Field(nullable=False)

class ChangePasswordPayload(BaseModel):
    web_hook_token: str = Field()
    id: UUID = Field(nullable=False)
    new_password: str = Field(nullable=False, min_items=8, max_length=64)

class UserAccountRouterResponse(BaseModel):
    detail: bool = Field(nullable=False)
    timestamp: datetime = Field(default=datetime.now(timezone.utc))

class UserAccountRouterErrorResponse(BaseModel):
    detail: str = Field()
    timestamp: datetime = Field(default=datetime.now(timezone.utc))