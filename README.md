# AI Music App - Project Structure

## Overview
This AI Music App allows users to generate and play AI-generated music using the Hugging Face API. The app is built with **React (Frontend)** and **Django (Backend)**.

## Project Directory Structure
```
/ai-music-app
│── frontend/                  # React Frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── MusicPlayer.js
│   │   │   ├── MusicGenerator.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── api.js             # Handles API calls to backend
│   ├── package.json
│   ├── .env                   # Environment variables
│── backend/                   # Django Backend
│   ├── ai_music/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   ├── asgi.py
│   ├── api/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── serializers.py
│   │   ├── utils.py           # Functions to interact with Hugging Face API
│   ├── manage.py
│   ├── requirements.txt
│── .gitignore
│── README.md
```

## Technologies Used
- **Frontend:** React, JavaScript, CSS
- **Backend:** Django, Django REST Framework
- **API:** Hugging Face AI Music API
- **Hosting:** Replit

## API Integration (Hugging Face)
- Fetch AI-generated music from Hugging Face using Python requests.
- Store and serve the generated music via Django REST API.
- React frontend fetches the music and plays it using a simple UI.

## Setup Instructions
### Backend
1. Install dependencies:
   ```sh
   pip install django djangorestframework requests
   ```
2. Run migrations and start the server:
   ```sh
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm start
   ```

## Future Enhancements
- Add user authentication.
- Allow users to save and share generated music.
- Enhance UI with animations and better music controls.

---
This document outlines the structure and setup for your AI Music App. Let me know if you need modifications! 🚀
