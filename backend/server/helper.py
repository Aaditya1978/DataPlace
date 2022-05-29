import os
from django.conf import settings
from django.core.mail import send_mail

def send_corp_email(email, name):
    subject = 'Thank you for registering on DataPlace'
    message = f'Hello {name},\n\nThank you for registering on DataPlace. Your Account is currently under verification.\n\nWe will get back to you soon.\n\nRegards,\nDataPlace Team'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail( subject, message, email_from, recipient_list )

def send_coll_email(email, name):
    subject = 'Thank you for registering on DataPlace'
    message = f'Hello {name},\n\nThank you for registering on DataPlace. Your Account is currently under verification.\n\nWe will get back to you soon.\n\nRegards,\nDataPlace Team'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail( subject, message, email_from, recipient_list )