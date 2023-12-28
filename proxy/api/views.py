import requests
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response


MAIN_SERVER_URL = "http://127.0.0.1:8080/api"

class ProxyViewset(ViewSet):
    def create(self, request, *args, **kwargs):
        response = requests.request(
            request.data['method'],
            f"{MAIN_SERVER_URL}/{request.data['endpoint']}/",
            json=request.data['payload'],
            headers=request.headers
        )
        return Response(response.json(), status=response.status_code)
