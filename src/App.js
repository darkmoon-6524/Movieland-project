import { useState, useEffect } from 'react';
import './MovieCard'
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?apikey=fcce3682'

const App = () => {
    const [Movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const movieSearch = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
    useEffect(() => {
        movieSearch('Spiderman');
    }, []);
    return (
        <>
            <div className="app">
                <h1>MovieLand</h1>
            </div>
            <div className="search">
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='Search'
                    onClick={() => movieSearch(searchTerm)}
                />
            </div>

            {Movies?.length > 0
                ? (
                    <div className="container">
                        {Movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>no movies found</h2>
                    </div>
                )}
        </>
    )
}

export default App;