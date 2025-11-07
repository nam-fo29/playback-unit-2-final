import MediaList from "../components/media-organization/MediaList";
import './pages-css/ListPages.css';
import '../pages/pages-css/media-queries.css'

//Rewind.jsx is home to the main draw of the app. This is where the user records every piece of media they experience. Originally, I had useState imported to update the list but during my testing and debugging phase I found that it was creating a local state that would override global state. This would prevent MediaCards from being fully deleted from Rewind and UpNext. When the delete button was clicked, the MediaCard would be removed but upon returning to the page the MediaCard would still be present on the list. Removing state from Rewind and UpNext fixed this issue and now the entire program works off of global state.

const Rewind = ({ lists, onDeleteFromList }) => {

    const mediaSortType = ["Movies", "TV Shows", "Video Games", "Books"];

    return (
        <div className="rewind">
            <h1 className="rewind-title">REWIND</h1>
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
                                onDelete={(media) => onDeleteFromList(media, "rewind")} />
                            </div>
                        )
                    );
                })}
            </div>
        </div>
    );
};

export default Rewind;