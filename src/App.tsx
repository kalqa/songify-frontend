import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios"; // Import CSS file for styling

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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/songs', {
                    withCredentials: true // Include credentials (cookies) in requests
                });
                setSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/token', {
                username,
                password
            }, {
                withCredentials: true // Include credentials (cookies) in requests
            });
            window.location.reload(); // Reload to trigger fetching songs
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    // Check if songs data is fetched (user is logged in)
    if (songs !== null) {
        return (
            <div>
                <h1>Home</h1>
                <pre>{JSON.stringify(songs, null, 2)}</pre>
            </div>
        );
    }

    // If songs data is not fetched (user is not logged in), show login form
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default App;
