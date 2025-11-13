import MediaList from "../components/media-organization/MediaList";
import './pages-css/ListPages.css';
import '../pages/pages-css/media-queries.css'
import { AuthContext } from "../Context/AuthContext";
import { useState } from "react";

//Rewind.jsx is home to the main draw of the app. This is where the user records every piece of media they experience. Originally, I had useState imported to update the list but during my testing and debugging phase I found that it was creating a local state that would override global state. This would prevent MediaCards from being fully deleted from Rewind and UpNext. When the delete button was clicked, the MediaCard would be removed but upon returning to the page the MediaCard would still be present on the list. Removing state from Rewind and UpNext fixed this issue and now the entire program works off of global state.

const Rewind = ({ lists }) => {

   const [setRefreshState] = useState(false);

    const mediaSortType = ["Movies", "TV Shows", "Video Games", "Books"];


    const handleDeleteFromListBackend = async (media, listType) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/media/${media.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete media. Status: ${response.status}`);
        }

        lists.rewind[listType] = lists.rewind[listType].filter(m => m.id !== media.id);

        setRefreshState(prev => !prev);

    } catch (err) {
        console.error("Failed to delete media from list", err);
    }
};

    



    const handleRefreshRewind = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/media/list/rewind`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();

        const formatted = {};
        ["Movies", "TV Shows", "Video Games", "Books"].forEach(type => {
            formatted[type] = data.filter(m => m.type === type);
        });

        lists.rewind = formatted;

        setRefreshState(prev => !prev);
    } catch (err) {
        console.error("Failed to refresh rewind list", err);
    }
}

    

    return (
        <div className="rewind">
            <h1 className="rewind-title">REWIND</h1>
            <button onClick={handleRefreshRewind}>Refresh Rewind</button>
            <div className="rewind-list-items">
                {mediaSortType.map((type) => {
                    const items = lists?.rewind?.[type] || []; //This stores a list of items based on media type. In the return statement, it only renders the <div> if there is at least one item detected.
                    return (
                        items && items.length > 0 && (
                            <div className="media-type-column" key={type}>
                                <MediaList 
                                key={type} 
                                list={items} 
                                title={type.toUpperCase()} 
                                showDelete={true} 
                                onDelete={(media) => handleDeleteFromListBackend(media, "rewind")} />
                            </div>
                        )
                    );
                })}
            </div>
        </div>
    );
};

export default Rewind;