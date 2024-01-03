import requests
import time
from rest_framework.viewsets import ViewSet
from rest_framework.exceptions import ParseError
from rest_framework.response import Response


MAIN_SERVER_URL = "http://127.0.0.1:8080/api"


def retrayable_request(request):
    response = None
    for i in range(10):
        print(request.data['payload'])
        print(request.data['method'])
        print(request.data["endpoint"])
        try:
            response = requests.request(
                request.data['method'],
                f"{MAIN_SERVER_URL}/{request.data['endpoint']}/",
                json=request.data['payload'],
                headers=request.headers
            )
            print(request.data['payload'])
        except:
            ...
        if response is not None:
            return response
        time.sleep(0.15)
        print(f"try: {i}")
    raise ParseError(
        detail={
            "message": "Timeout error"
        }, 
        code=400
    )


class ProxyViewset(ViewSet):
    def create(self, request, *args, **kwargs):
        response = retrayable_request(request)
        if response.status_code == 204:
            return Response(status=204)
        print(response.status_code)
        print(response.content)
        return Response(response.json(), status=response.status_code)

