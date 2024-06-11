from account.models import ProfileUser
from django.contrib.auth.models import User



def profile(request):
    if request.user.is_authenticated:
        profile = ProfileUser.objects.get(user=request.user)
        userdata = User.objects.get(username=request.user)

    else:
        profile = None
        userdata = None

    return {'profile':profile,'userdata':userdata}



