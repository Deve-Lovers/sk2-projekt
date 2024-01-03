import requests
import time
from rest_framework.viewsets import ViewSet
from rest_framework.exceptions import ParseError
from rest_framework.response import Response

from django.conf import settings


def retrayable_request(request):
    response = None
    for _ in range(10):
        try:
            print(f"(proxy) sendint request: {request.data['method']} {request.data['endpoint']}")
            response = requests.request(
                request.data['method'],
                f"{settings.MAIN_SERVER_URL}/{request.data['endpoint']}/",
                json=request.data['payload'],
                headers=request.headers
            )
        except:
            pass

        if response is not None:
            return response

        time.sleep(settings.RETRAYABLE_TIME_DURATION)

    raise ParseError(detail={"message": "Timeout error"},  code=400)


class ProxyViewset(ViewSet):
    def create(self, request, *args, **kwargs):
        response = retrayable_request(request)
        print(f"(proxy) returning response: status_code: {response.status_code} size: {len(response.content)}")
        if response.status_code == 204:
            return Response(status=204)
        return Response(response.json(), status=response.status_code)
