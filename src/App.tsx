import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

interface Song {
  id: number;
  name: string;
  genre: {
    id: number;
    name: string;
  };
}

function App(): JSX.Element {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    async function fetchSongs() {
      try {
        // Encode username and password in Base64
        const token = btoa('john:12345');
        const response = await fetch('http://localhost:8080/songs?page=0&size=50&sort=ASC', {
          headers: {
            Authorization: `Basic ${token}`, // Add the authorization header
          },
        });
        const data = await response.json();
        setSongs(data.songs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchSongs();
  }, []); // No dependencies, fetch songs only once

  return (
      <div className="container">
        <h1>Songs</h1>
        <ul className="song-list">
          {songs.map((song) => (
              <li key={song.id} className="song-item">
                <div className="song-name">{song.name}</div>
                <div className="genre">{song.genre.name}</div>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
