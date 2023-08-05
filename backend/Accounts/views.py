from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.hashers import make_password
from rest_framework import authentication, permissions, status
from rest_framework.generics import RetrieveAPIView, CreateAPIView, UpdateAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponseNotFound, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


from Accounts.models import UserProfile
from Accounts.serializers import UpdateSerializer, UserSerializer
from Accounts.tokens import create_jwt_pair_for_user


class AccountView(CreateAPIView):
    serializer_class = UserSerializer


class UpdateView(UpdateAPIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateSerializer

    def get_object(self):
        return get_object_or_404(UserProfile, id=self.request.user.id)

    def update(self, request, *args, **kwargs):
        if request.data.get('password') != '' and request.data.get('password') and request.data.get('password') == \
                request.data.get('password2'):
            user = get_object_or_404(UserProfile, id=self.request.user.id)
            user.set_password(request.data.get('password'))
            user.save()
            update_session_auth_hash(request, user)
            del request.data['password']
        return super().update(request, *args, **kwargs)



class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        remember_me = request.data.get('remember_me')

        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            
            response = {"message": "Login Successful"}
            userdata = UserSerializer(user).data
            request.session['user'] = userdata
        
            return Response(data=response, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    # def get(self, request):
    #     content = {"user": str(request.user), "auth": str(request.auth)}
    #     return Response(data=content, status=status.HTTP_200_OK)


    # def post(self, request):
    #     username = request.data.get('username')
    #     password = request.data.get('password')
    #
    #     user = authenticate(username=username, password=password)
    #     if user:
    #         login(request, user)
    #         return Response()
    #     else:
    #         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class DeleteAccountView(APIView):
    serializer_class = UserSerializer
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = UserProfile.objects.filter(pk=self.kwargs['pk'])
        user.delete()
        return Response({"result": "user delete"})

    def get_queryset(self):
        return UserProfile.objects.all()


# class ShowView(ListAPIView):
#     serializer_class = UserSerializer
#
#     def get_queryset(self):
#         return UserProfile.objects.all()


# @method_decorator(csrf_exempt, name='dispatch')
class LogOutView(APIView):
    def post(self, request):
        if self.request.user.is_authenticated:
            logout(request)
            return Response("Successfully logged out.")
        else:
            return Response("You are not logged in.")


class getAccountView(RetrieveAPIView):
    serializer_class = UserSerializer
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return get_object_or_404(UserProfile, id=self.kwargs['id'])

def get_user_session(request):
    user = request.session.get('user')

    if user:
        return JsonResponse({"user": user})
    return HttpResponseNotFound()


# class UpdateSessionToken(APIView):
#     def post(self, request):
#         tokens = request.data.get('tokens', None)
#         if tokens:
#             request.session['tokens'] = tokens
#             return Response("Successfully updated token")
#         return HttpResponseNotFound("No token provided")
