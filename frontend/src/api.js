import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const searchMusic = async (query) => {
    const response = await axios.post(`${API_BASE_URL}/search-music/`, { query });
    return response.data;
};