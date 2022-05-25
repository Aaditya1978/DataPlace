from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CorpUserSerializer
from django.contrib.auth.hashers import make_password
from .models import CorpUser

# Create your views here.
class CorpUserView(APIView):

    def get(self, request):
        corp_user = CorpUser.objects.all()
        serializer = CorpUserSerializer(corp_user, many=True)
        for obj in serializer.data:
            del obj['password']
        return Response(serializer.data, status = status.HTTP_200_OK)

    def post(self, request):
        if request.data['type'] == 'signup':
            email = request.data['email']
            if CorpUser.objects.filter(email=email).exists():
                return Response({'error': 'Company already Registered with given mail'}, status=status.HTTP_400_BAD_REQUEST)

            password = request.data['password']
            password = make_password(password)

            data = {
                'name': request.data['name'],
                'website': request.data['website'],
                'email': request.data['email'],
                'contact': request.data['contact'],
                'address': request.data['address'],
                'city': request.data['city'],
                'state': request.data['state'],
                'pincode': request.data['pincode'],
                'password': password
            }

            verification_doc = request.FILES['verification_doc']
            # save the doc to database
            data['verification_doc'] = verification_doc


            serializer = CorpUserSerializer(data=data)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.data['type'] == 'login':
            email = request.data['email']
            password = request.data['password']
            if CorpUser.objects.filter(email=email).exists():
                user = CorpUser.objects.get(email=email)
                if user.password == make_password(password):
                    return Response({'success': 'Login Successful'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid Password'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Invalid Email'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'error': 'Invalid Request'}, status=status.HTTP_400_BAD_REQUEST)

