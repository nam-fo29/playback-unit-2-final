const MediaButton = ({type, selectedType, onClick}) => {
    const isSelected = type === selectedType;
    return (
        <button type="button" onClick={onClick} className={isSelected ? "selected" : ""}>{type}</button>
    )
}; //This component renders a button for each media type on the Home page. Another function of this component is to allow CSS to check if the media type button has been clicked or "selected" to provide user feedback. The button will change color. The ternary in the className achieves this.

export default MediaButton