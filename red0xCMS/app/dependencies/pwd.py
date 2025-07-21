from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto", argon2__time_cost=2, argon2__memory_cost=1024, bcrypt__rounds=10)

def HashText(plain_text: str):
    return pwd_context.hash(plain_text)

def VerifyText(plain_text: str, hashed_text: str):
    return pwd_context.verify(plain_text, hashed_text)