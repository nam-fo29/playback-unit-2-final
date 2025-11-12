import MediaList from "../components/media-organization/MediaList";
import './pages-css/ListPages.css';
import { createMedia, addMediaToList, removeMediaFromList } from "../api";

//Similar to Rewind.jsx, this component is another list but is a distinct feature. UpNext.jsx is intended for the user to add media that they wish to experience later on. Usually refered to as a "watch list", this page features handleAddAndRemove, an event handler connected to the "Add to Rewind" button that simultaneously adds media to the Rewind list and deletes it from UpNext. UpNext had the same state issue as Rewind and was fixed during the testing and debugging phase.

const UpNext = ({ lists, onAddToList, onDeleteFromList }) => {
    const mediaSortType = ["Movies", "TV Shows", "Video Games", "Books"];

    const handleAddToListBackend = async (media, listType) => {
        try {
            const createdMedia = await createMedia(media);
            await addMediaToList(listType, createdMedia.id);
            onAddToList(media, listType);
        } catch {
            //silent catch
        }
    };

    const handleDeleteFromListBackend = async (media, listType) => {
        try {
            await removeMediaFromList(listType, media.id);
            onDeleteFromList(media, listType);
        } catch {
            //silent catch
        }
    };

    const handleAddAndRemove = (media) => {
        handleAddToListBackend(media, "rewind");
        handleDeleteFromListBackend(media, "upNext");
    };

    return (
        <div className="up-next">
            <h1 className="up-next-title">UP NEXT</h1>
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