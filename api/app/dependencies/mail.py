import os
import smtplib
import dotenv

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from ssl import create_default_context

dotenv.load_dotenv()

# Environment variables
MAIL_HOST = os.getenv("MAIL_HOST", "smtp.c1.liara.email")
MAIL_PORT = int(os.getenv("MAIL_PORT", 465))
MAIL_USER = os.getenv("MAIL_USER", "")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", "")
MAIL_FROM_ADDRESS = os.getenv("MAIL_FROM_ADDRESS", "")
MAIL_FROM_NAME = os.getenv("MAIL_FROM_NAME", "Maziyar")

def send_email(to_address, subject, body):
    print()
    try:
        # Enforce TLS
        context = create_default_context()

        # Connect to the server
        with smtplib.SMTP_SSL(MAIL_HOST, MAIL_PORT, context=context) as server:
            server.login(MAIL_USER, MAIL_PASSWORD)

            # Prepare the email
            msg = MIMEMultipart()
            msg["From"] = f"{MAIL_FROM_NAME} <{MAIL_FROM_ADDRESS}>"
            msg["To"] = to_address
            msg["Subject"] = subject
            msg.attach(MIMEText(body, "plain"))

            # Send the email
            server.sendmail(MAIL_FROM_ADDRESS, to_address, msg.as_string())
            return True
    except Exception as e:
        print(e)
        return False