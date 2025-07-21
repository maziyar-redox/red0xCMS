from validate_email import validate_email

def ValidateEmail(email) -> bool:
    try:
        is_valid = validate_email(email=email)
        if is_valid is True:
            return True
        else:
            return False
    except Exception as e:
        return False