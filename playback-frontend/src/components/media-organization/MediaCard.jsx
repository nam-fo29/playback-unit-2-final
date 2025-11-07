import "./media-org-css/MediaCard.css"
import DeleteButton from "../media-search/DeleteButton";

//This component formats the media results into a quick and easy to read card. Reusable for each media type.

const MediaCard = ({ media, onAddToList, showDelete, onDelete, hideUpNextButton }) => ( //hideUpNextButton is used to used to keep the "Add to Up Next" button from appearing on the Up Next list.
    //Line 9 is a conditional that either shows the image that is included in the API or nothing at all. Not all of the data in the API comes with an image.
    <div className="media-card">
        {media.poster ? <img className="media-poster" src={media.poster} alt={media.title} /> : null}
        <div className="media-card-content">
            <h3>{media.title}</h3>
            {media.rated && <p className="media-card-info">{media.rated}</p>}
            <p className="media-card-info">Year: {media.year}</p>
            {(onAddToList || showDelete) && (
                <div className="media-card-buttons">
                    {onAddToList && (
                        <>
                            <button onClick={() => onAddToList(media, "rewind")}>Add to Rewind</button>
                            {!hideUpNextButton && (
                                <button onClick={() => onAddToList(media, "upNext")}>Add to Up Next</button>
                            )}
                        </>
                    )}
                    {showDelete && (
                        <DeleteButton onClick={() => onDelete(media)} />
                    )}
                </div>
            )}
        </div>
    </div>
);

export default MediaCard;