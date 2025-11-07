import { useState } from "react";
import MediaButton from "./MediaButton";
import Loading from "../media-organization/Loading";

//SearchBar.jsx is the the search function. The MediaButton component is imported to allow it to connect the the specific APIs.

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const validQuery = query.trim(); //Edge case handling. Trims extra spaces and checks for searches that are too short. Returns feedback for both on UI.
        if (!validQuery) {
            setError("Please enter a valid search");
            return;
        }

        if (validQuery.length < 3) {
            setError("Title is too short");
            return;
        }

        if (!mediaType) {
            setError("Please select a media type to complete your search");
            return;
        }
        setError("")
        setLoading(true);
        
        setTimeout(() => {
            onSearch(validQuery, mediaType);

            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }, 2000);

    };

    const mediaTypes = ["Movies", "TV Shows", "Video Games", "Books"];

    return (
        <>
            <form onSubmit={handleSubmit} className="search-bar">
                <input type="text" placeholder="Search titles here..." value={query} onChange={e => setQuery(e.target.value)} />
                <div className="media-buttons">
                    {mediaTypes.map((type) => (
                        <MediaButton
                            key={type}
                            type={type}
                            selectedType={mediaType}
                            onClick={() => setMediaType(type)} />
                    ))}
                </div>
                <button type="submit" className="submit-search">Search</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            {loading && <Loading />}
        </>
    );
};

export default SearchBar;