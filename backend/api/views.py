from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from .models import Music
from .serializers import MusicSerializer

class GenerateMusic(APIView):
    def post(self, request):
        # Access the API key from settings
        api_key = settings.HUGGING_FACE_API_KEY

        # Call Hugging Face API
        response = requests.post(
            'https://api-inference.huggingface.co/models/facebook/musicgen-small',
            headers={'Authorization': f'Bearer {api_key}'},
            json={'inputs': request.data.get('prompt')}
        )

        if response.status_code == 200:
            # Save the generated music
            music = Music.objects.create(
                title=request.data.get('title'),
                generated_music=response.content
            )
            serializer = MusicSerializer(music)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Failed to generate music'}, status=response.status_code)