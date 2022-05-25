from django.urls import path, include
from .views import CorpUserView

urlpatterns = [
    path('corp_user', CorpUserView.as_view()),
]