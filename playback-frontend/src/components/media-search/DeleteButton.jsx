const DeleteButton = ({onClick}) => {
    return (
        <button className="delete-button" onClick={onClick}>Delete</button>
    );
};

export default DeleteButton;

//I removed this function from Rewind and Up Next to stay in line with DRY and make it reusable. This button connects to handleDeleteFromList.