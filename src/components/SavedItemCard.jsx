import '../styles/SavedItem.css'

const SavedItemCard = () => {
    return (
        <div className="saved-card-container">
            <h2>Free CSS stuff</h2>
            <div className='tags'>
                <p>Coding</p>
                <p>CSS</p>
                <p>Free stuff</p>
            </div>
            <p>found this when searcfhing for a tut. its soo convenient</p>
        </div>
    );
};

export default SavedItemCard;