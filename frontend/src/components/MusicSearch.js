import React, { useState } from 'react';
import { searchMusic } from '../api';

const MusicSearch = () => {
    const [query, setQuery] = useState('');
    const [mainSong, setMainSong] = useState(null);
    const [relatedSongs, setRelatedSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await searchMusic(query);
            setMainSong(data.main_song);
            setRelatedSongs(data.related_songs);
        } catch (error) {
            setError('Failed to search for music. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Search for a Song</h2>
            <div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter a song name"
                />
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {mainSong && (
                <div>
                    <h3>Main Song</h3>
                    <iframe
                        width="560"
                        height="315"
                        src={mainSong.url}
                        title={mainSong.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
            {relatedSongs.length > 0 && (
                <div>
                    <h3>Related Songs</h3>
                    <ul>
                        {relatedSongs.map((song, index) => (
                            <li key={index}>
                                <a href={song.url} target="_blank" rel="noopener noreferrer">
                                    {song.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MusicSearch;