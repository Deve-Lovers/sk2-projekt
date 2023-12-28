from django.urls import include, path
from rest_framework import routers


from api.views import ProxyViewset


router = routers.DefaultRouter()
router.register(r"proxy", ProxyViewset, basename="proxy")


urlpatterns = [
    path('', include(router.urls)),
]
