import React, {useEffect, useState} from 'react';
import './App.css';

interface Song {
    id: number;
    name: string;
    genre: {
        id: number;
        name: string;
    };
}

function App(): JSX.Element {
    const [songs, setSongs] = useState<Song[] | null>(null);

    const getSongs = async () => {
        try {
            const response = await fetch('https://localhost:8443/songs', {
                method: 'GET',
                redirect: 'follow',
                credentials: 'include',
            });
            if (response.status === 401) {
                // Handle 401 Unauthorized by redirecting to the OAuth2 login endpoint
                // @ts-ignore
                window.location.href = 'https://localhost:8443/oauth2/authorization/google' as unknown as Location; // Explicitly cast as Location
                return;
            }
            if (response.ok) {
                const data = await response.json();
                setSongs(data);
            } else {
                console.error('Error fetching songs:', response.statusText);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    useEffect(() => {
        getSongs();
    }, []);

    if (songs !== null) {
        return (
            <div>
                <h1>Logged In</h1>
                <pre>{JSON.stringify(songs, null, 2)}</pre>
            </div>
        );
    }

    return (
        <div>
            <h1>Not Logged In</h1>
        </div>
    );
}

export default App;
