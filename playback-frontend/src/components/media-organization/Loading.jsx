import vhsSpinner from "../../images/vhs-img.webp"
import './media-org-css/Loading.css'

//This component sets up the "spinner" image for the simulated loading animation.

const Loading = () => {
    return (
        <div className="loading-message">
            <img src={vhsSpinner} alt="Loading.." className="spinner" />
        </div>
    );
};

export default Loading;