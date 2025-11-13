import MediaList from "../components/media-organization/MediaList";
import './pages-css/ListPages.css';
import { useState } from "react";

//Similar to Rewind.jsx, this component is another list but is a distinct feature. UpNext.jsx is intended for the user to add media that they wish to experience later on. Usually refered to as a "watch list", this page features handleAddAndRemove, an event handler connected to the "Add to Rewind" button that simultaneously adds media to the Rewind list and deletes it from UpNext. UpNext had the same state issue as Rewind and was fixed during the testing and debugging phase.

const UpNext = ({ lists }) => {
    const mediaSortType = ["Movies", "TV Shows", "Video Games", "Books"];

    const [_, setRefreshState] = useState(false);


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


    const handleAddAndRemove = async (media) => {
    try {
        const token = localStorage.getItem("token");
        

        await fetch(`http://localhost:8080/media/${media.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                list_type: "rewind"
            })
        });

        handleRefreshRewind();

    } catch (err) {
        console.error("Failed to move media from UpNext to Rewind", err);
    }
};


    const handleRefreshRewind = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/media/list/upNext`, {
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

            lists.upNext = formatted;

            setRefreshState(prev => !prev);
        } catch (err) {
            console.error("Failed to refresh rewind list", err);
        }
    }

    return (
        <div className="up-next">
            <h1 className="up-next-title">UP NEXT</h1>
            <button onClick={handleRefreshRewind}>Refresh Up Next</button>

            <div className="up-next-list-items">
                {mediaSortType.map((type) => {
                    const items = lists.upNext[type]; //This begins a conditional that only runs the <div> if there is something to be presented on the list.
                    return (
                        items && items.length > 0 && (
                            <div className="media-type-column" key={type}>
                                <MediaList
                                    key={type}
                                    list={items}
                                    title={type.toUpperCase()}
                                    showDelete={true}
                                    onDelete={(media) => handleDeleteFromListBackend(media, "upNext")}
                                    onAddToList={handleAddAndRemove}
                                    hideUpNextButton={true} />
                            </div>
                        )
                    );
                })}
            </div>
        </div>
    )
};
export default UpNext;