from django.urls import path, include
from .views import CorpUserView
from .views import ColUserView
from .views import VerifyToken

urlpatterns = [
    path('corp_user', CorpUserView.as_view()),
    path('coll_user' , ColUserView.as_view()),
    path('verify_token' , VerifyToken.as_view())
]