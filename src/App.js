import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";


//  8622df91
const API_URL = 'http://www.omdbapi.com/?apikey=8622df91';

const movie1 = {
    "Title": "Spiderman",
    "Year": "1990",
    "imdbID": "tt0100669",
    "Type": "movie",
    "Poster": "N/A"
}

const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const searchMovies = async (title) => {
        try {
            const reponse = await fetch(`${API_URL}&s=${title}`)
            const data = await reponse.json()
            setMovies(data.Search)
        } catch (error) {
            console.error('Error fetching movie:', error)
        }
    }

    useEffect(() => {
        searchMovies('Spiderman')

    }, [])

    return (
        <>

            <div className="app">
                <h1>MovieBox</h1>
            </div>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}

                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }


        </>
    );
}

export default App;