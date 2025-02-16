import google.generativeai as genai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

genai.configure(api_key=settings.GEMINI_API_KEY)

class SearchMusic(APIView):
    def post(self, request):
        query = request.data.get('query')  # Song name or search query
        if not query:
            return Response({'error': 'Query is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Use Gemini to search for the song
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content(f"Search for the song '{query}' and return the most relevant result along with related songs.")

            # Parse the response (example format)
            main_song = {
                'title': 'Main Song Title',
                'artist': 'Main Song Artist',
                'url': 'https://www.youtube.com/embed/VIDEO_ID',  # Embed URL for playback
            }
            related_songs = [
                {'title': 'Related Song 1', 'url': 'https://www.youtube.com/embed/VIDEO_ID_1'},
                {'title': 'Related Song 2', 'url': 'https://www.youtube.com/embed/VIDEO_ID_2'},
            ]

            return Response({
                'main_song': main_song,
                'related_songs': related_songs,
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)