import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Backend URL

export const generateMusic = async (prompt, title) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-music/`, {
      prompt,
      title,
    });
    return response.data; // Return the generated music data
  } catch (error) {
    console.error('Error generating music:', error);
    throw error; // Throw error for handling in the component
  }
};