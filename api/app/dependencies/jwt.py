import jwt

def SignJwt(private_key: str, public_key: str, claims: dict[str, str], algo: str):
    jwt_token = jwt.encode(payload=claims, key=private_key, algorithm=algo)
    return jwt_token