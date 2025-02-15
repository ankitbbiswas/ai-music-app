import React, { useState } from 'react';
import axios from 'axios';

const MusicGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [music, setMusic] = useState(null);

    const handleGenerate = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/generate-music/', {
                prompt: prompt,
                title: 'Generated Music',
            });
            setMusic(response.data.generated_music);
        } catch (error) {
            console.error('Error generating music:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt"
            />
            <button onClick={handleGenerate}>Generate Music</button>
            {music && <audio controls src={music} />}
        </div>
    );
};

export default MusicGenerator;