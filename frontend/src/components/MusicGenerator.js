import React, { useState } from 'react';
import { generateMusic } from '../api';

const MusicGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [musicUrl, setMusicUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateMusic(prompt, title);
      setMusicUrl(data.generated_music); // Set the music URL
    } catch (error) {
      setError('Failed to generate music. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Music</h2>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title"
        />
      </div>
      <div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
        />
      </div>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Music'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {musicUrl && (
        <div>
          <h3>Generated Music</h3>
          <audio controls src={musicUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default MusicGenerator;