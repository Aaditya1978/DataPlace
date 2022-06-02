from msilib.schema import ReserveCost
from django.urls import path, include
from .views import CorpUserView , ColUserView, ResetPassword , VerifyToken , SendPasswordResetMail , ResetPassword

urlpatterns = [
    path('corp_user', CorpUserView.as_view()),
    path('coll_user' , ColUserView.as_view()),
    path('verify_token' , VerifyToken.as_view()),
    path('send_password_mail' , SendPasswordResetMail),
    path('change_password' , ResetPassword),
] 