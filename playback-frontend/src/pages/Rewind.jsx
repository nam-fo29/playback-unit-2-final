import MediaList from "../components/media-organization/MediaList";
import './pages-css/ListPages.css';
import '../pages/pages-css/media-queries.css'
import { removeMediaFromList } from "../api";
//import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

//Rewind.jsx is home to the main draw of the app. This is where the user records every piece of media they experience. Originally, I had useState imported to update the list but during my testing and debugging phase I found that it was creating a local state that would override global state. This would prevent MediaCards from being fully deleted from Rewind and UpNext. When the delete button was clicked, the MediaCard would be removed but upon returning to the page the MediaCard would still be present on the list. Removing state from Rewind and UpNext fixed this issue and now the entire program works off of global state.

const Rewind = ({ lists, onDeleteFromList }) => {
   // const { user } = useContext(AuthContext);

    const mediaSortType = ["Movies", "TV Shows", "Video Games", "Books"];

    const handleDeleteFromListBackend = async (media, listType) => {
        try {
            await removeMediaFromList(listType, media.id);
            onDeleteFromList(media, listType);
        } catch {
            //silent catch
        }
    };

    const handleRefreshRewind = async () => {
    try {
        const response = await fetch(`http://localhost:8080/media/list/rewind`);
        const data = await response.json();

        const formatted = {};
        ["Movies", "TV Shows", "Video Games", "Books"].forEach(type => {
            formatted[type] = data.filter(m => m.type === type);
        });

        // Update the global lists object
        lists.rewind = formatted;
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
                    const items = lists.rewind[type]; //This stores a list of items based on media type. In the return statement, it only renders the <div> if there is at least one item detected.
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