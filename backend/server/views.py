from unicodedata import name
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import CorpUserSerializer
from .serializers import ColUserSerializer
from django.contrib.auth.hashers import make_password
import jwt
import os
from server.helper import send_corp_email, send_coll_email , send_otp_email
from .models import CorpUser
from .models import ColUser


jwt_key = os.environ.get('JWT_KEY')
jwt_algo = os.environ.get('JWT_ALGO')


# Create your views here.

class VerifyToken(APIView):
    def get(self, request):
        token = request.headers['Authorization']
        if token is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        try:
            payload = jwt.decode(token, jwt_key, algorithms=jwt_algo)
            email = payload['email']
            if payload['type'] == 'corp':
                user = CorpUser.objects.get(email=email)
                serializer = CorpUserSerializer(user)
                del serializer.data['password']
                return Response(serializer.data, status=status.HTTP_200_OK)
            elif payload['type'] == 'coll':
                user = ColUser.objects.get(email=email)
                serializer = ColUserSerializer(user)
                del serializer.data['password']
                return Response(serializer.data, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class CorpUserView(APIView):

    def get(self, request):
        email = request.query_params['email']
        corp_user = CorpUser.objects.get(email=email)
        serializer = CorpUserSerializer(corp_user)
        del serializer.data['password']
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
                send_corp_email(email, name=data['name'])
                # set exp to 5 hours
                token = jwt.encode({"email": email , "type": "corp"}, jwt_key, algorithm=jwt_algo)
                return Response({'token': token}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.data['type'] == 'login':
            email = request.data['email']
            password = request.data['password']
            if CorpUser.objects.filter(email=email).exists():
                user = CorpUser.objects.get(email=email)
                if user.password == make_password(password):
                    token = jwt.encode({"email": email , "type": "corp"}, jwt_key, algorithm=jwt_algo)
                    return Response({'success': 'Login Successful', 'token': token}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid Password'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Invalid Email'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'error': 'Invalid Request'}, status=status.HTTP_400_BAD_REQUEST)


class ColUserView(APIView):
    def get(self , request):
        email = request.query_params['email']
        coll_user = ColUser.objects.get(email=email)
        serializer = ColUserSerializer(coll_user)
        del serializer.data['password']
        return Response(serializer.data, status = status.HTTP_200_OK)

    def post(self , request):
        if request.data['type'] == 'signup':
            email = request.data['email']
            if ColUser.objects.filter(email=email).exists():
                return Response({'error': 'College already Registered with given mail'}, status=status.HTTP_400_BAD_REQUEST)

            password = make_password(request.data['password'])

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
            data['verification_doc'] = verification_doc

            serializer = ColUserSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                send_coll_email(email, name=data['name'])
                token = jwt.encode({"email": email , "type": "coll"}, jwt_key, algorithm=jwt_algo)
                return Response({'token': token}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.data['type'] == 'login':
            email = request.data['email']
            password = request.data['password']
            if ColUser.objects.filter(email=email).exists():
                user = ColUser.objects.get(email=email)
                if user.password == make_password(password):
                    token = jwt.encode({"email": email , "type": "coll"}, jwt_key, algorithm=jwt_algo)
                    return Response({'success': 'Login Successful','token': token}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid Password'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Invalid Email'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'error': 'Invalid Request'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET' , 'POST'])
def SendPasswordResetMail(request):
    if request.method == 'POST':
        if request.POST['type'] == 'corp' :
            class_type = CorpUser
        elif request.POST['type'] == 'coll' :
            class_type = ColUser

        email = request.POST['email']

        if class_type.objects.filter(email=email).exists() == False:
            return Response({'error': "Email doesn't exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = class_type.objects.get(email=email)
        name = user.name
        otp = send_otp_email(email , name)
        return Response({'message': "Email sent" , "otp" : otp} , status=status.HTTP_200_OK)

@api_view(['GET' , 'POST'])
def ResetPassword(request):
    if request.method == 'POST':
        print(request.POST , "This is data")
        if request.POST['type'] == 'corp':
            class_type = CorpUser
        elif request.POST['type'] == 'coll':
            class_type = ColUser

        email = request.POST['email']
        user = class_type.objects.get(email=email)
        new_password = make_password(request.POST['password'])
        user.password = new_password # Updated password
        user.save()
        return Response({'message': "Password changed successfully"} , status=status.HTTP_200_OK)