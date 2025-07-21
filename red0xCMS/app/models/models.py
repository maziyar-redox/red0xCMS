from typing import Optional, List
from datetime import timezone, datetime
from uuid import UUID, uuid4
from sqlmodel import SQLModel, Field, Relationship
from pydantic import EmailStr
from sqlalchemy.orm import Mapped

class User(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    first_name: str = Field(default="super", max_length=12, min_length=3)
    last_name: str = Field(default="user", max_length=12, min_length=3)
    email: EmailStr = Field(index=True, unique=True, max_length=32, min_length=6)
    username: str = Field(index=True, unique=True, max_length=8, min_length=4)
    password: str = Field(min_length=8, max_length=64)
    profile_pic: Optional[str] = Field(nullable=True, default=None)
    created_at: datetime = Field(nullable=False, default=datetime.now(timezone.utc))
    updated_at: datetime = Field(nullable=False, default=datetime.now(timezone.utc))
    is_guard: bool = Field(nullable=False, default=False)

    reset_password: List["ResetPasswordToken"] = Relationship(back_populates="user", sa_relationship_kwargs={"lazy": "selectin"}, cascade_delete=True)
    otp_token: List["OtpToken"] = Relationship(back_populates="user", sa_relationship_kwargs={"lazy": "selectin"}, cascade_delete=True)

class ResetPasswordToken(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    token: str = Field(nullable=False, max_length=512, index=True, unique=True)
    created_at: datetime = Field(nullable=False, default=datetime.now(timezone.utc))
    expires_at: datetime = Field(nullable=False, default=datetime.now(timezone.utc))

    user_id: UUID | None = Field(default=None, foreign_key="user.id")
    user: Mapped[User | None] = Relationship(back_populates="reset_password")

class OtpToken(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    token: int = Field(nullable=False, max_length=6, min_length=6, index=True, unique=True)
    created_at: datetime = Field(nullable=False, default=datetime.now(timezone.utc))
    expires_at: datetime = Field(nullable=False, default=datetime.now(timezone.utc))

    user_id: UUID | None = Field(default=None, foreign_key="user.id")
    user: Mapped[User | None] = Relationship(back_populates="otp_token")