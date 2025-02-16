import google.generativeai as genai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import re

genai.configure(api_key=settings.GEMINI_API_KEY)

class GenerateMusic(APIView):
    def post(self, request):
        query = request.data.get('query')  # Song name or search query
        if not query:
            return Response({'error': 'Query is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Use Gemini API to generate response
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content(f"Find the best match for the song '{query}' and return the song title, artist, and YouTube video ID.")

            # Debug: Print API response
            print("Gemini API Response:", response.text)

            # Extract meaningful information from response
            response_text = response.text  

            # Example parsing logic (modify based on actual response)
            lines = response_text.split("\n")
            main_song = {
                'title': lines[0] if len(lines) > 0 else 'Unknown',
                'artist': lines[1] if len(lines) > 1 else 'Unknown Artist',
                'url': extract_youtube_embed_url(response_text),  # Extract video ID and create embed link
            }

            related_songs = []
            for line in lines[2:5]:  # Taking a few lines as related songs
                related_songs.append({
                    'title': line,
                    'url': extract_youtube_embed_url(line),
                })

            return Response({
                'main_song': main_song,
                'related_songs': related_songs,
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print("Gemini Error:", str(e))  # Log the error
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def extract_youtube_embed_url(text):
    """
    Extracts a YouTube video ID from text and returns an embeddable URL.
    """
    youtube_regex = r"(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^\"&?\/\s]{11})"
    match = re.search(youtube_regex, text)
    if match:
        video_id = match.group(1)
        return f"https://www.youtube.com/embed/{video_id}"
    return "https://www.youtube.com"  # Default fallback
