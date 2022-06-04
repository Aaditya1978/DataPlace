from django.urls import path
from .views import VerifyToken, CorpUserView , ColUserView, GovtUserView, ResetPassword, SendPasswordResetMail

urlpatterns = [
    path('corp_user', CorpUserView.as_view()),
    path('coll_user' , ColUserView.as_view()),
    path('gov_user' , GovtUserView.as_view()),
    path('verify_token' , VerifyToken.as_view()),
    path('send_password_mail' , SendPasswordResetMail),
    path('change_password' , ResetPassword),
] 