import { useEffect, useState } from "react";
import SearchBar from "../components/media-search/SearchBar";
import MediaList from "../components/media-organization/MediaList";
import UserAuth from "./UserAuth";

//Due to security issues with GitHub, I have stored my API keys in a .env file that has not been pushed to GitHub.

//State handling for the entire program lives here in Home.jsx. This creates the global
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const Home = ({ onAddToList }) => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://localhost:8080/auth/status", { 
                    method: "GET",
                    credentials: "include"
                });
                if (response.ok) {
                    const data = await response.json();
                    setIsAuthenticated(data.isAuthenticated === true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
    };

    const fetchMedia = async (query, type) => {
        let mediaData = [];
        setError(null);
        try {
            if (type === "Movies" || type === "TV Shows") {
                const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}&i=${query}&type=${type === "TV Shows" ? "series" : "movie"}`);
                const json = await response.json();
                if (json.Response === "False") {
                    throw new Error(json.Error || "No results found");
                }

                const moreDetails = json.Search.map(async (item) => {
                    const detailResponse = await fetch(
                        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${item.imdbID}`
                    );
                    const details = await detailResponse.json();
                    return {
                        title: details.Title,
                        type,
                        year: details.Year,
                        poster: details.Poster,
                        rated: details.Rated
                    }
                });

                mediaData = await Promise.all(moreDetails);

                //Above is where the program uses fetch to request data from my 3 APIs. Only two of them needed keys and one of the API's covered two media types. Below is where the data I need from the API is taken via map().

            } else if (type === "Video Games") {
                const response = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${query}`);
                const json = await response.json();

                if (json.Response === "False") {
                    throw new Error(json.Error || "No results found")
                }
                mediaData = json.results.map(game => ({
                    title: game.name,
                    type,
                    year: game.released,
                    poster: game.background_image,
                    rated: game.esrb_rating?.name
                }));
            } else if (type === "Books") {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
                const json = await response.json();
                if (json.items) {
                    mediaData = json.items.map(book => ({
                        title: book.volumeInfo.title,
                        year: book.volumeInfo.publishedDate,
                        type,
                        poster: book.volumeInfo.imageLinks?.thumbnail,
                        rated: book.volumeInfo.categories?.[0]
                    }));
                }
            }
            setResults(mediaData);
        } catch {
            setError("Unable to complete search. Title may not be available. Please try again.")
            setResults([]);
        }
    }; //This entire codeblock is in a try...catch block for error handling purposes. The program tries to fetch data from the API based on the query made by the user. If the query does not match anything in the API, the catch block triggers and returns an error message in the UI.

    if (!isAuthenticated) {
        return <UserAuth onAuthSuccess={handleAuthSuccess} />;
    }
    
    return (
        <div>
            <h1 className="start-search">Search Titles To Start Your List</h1>
            <SearchBar onSearch={fetchMedia} />
            {error && <p className="error-message">{error}</p>}
            <MediaList className="search-stuff" list={results} title="Search Results" onAddToList={onAddToList} />
        </div>
    );
};

export default Home;