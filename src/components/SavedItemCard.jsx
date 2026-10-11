import '../styles/SavedItem.css'

const SavedItemCard = ({ title, tags, notes, image }) => {
    return (
        <div className="saved-card-container">
            {image && (
                <img src={image} alt={title} />
            )}
            <h2>{title}</h2>
            <div className='tags'>
                {tags.map((tag) => (
                    <p key={tag}>
                        {tag}
                    </p>
                ))}
            </div>
            <p>{notes}</p>
        </div>
    );
};

export default SavedItemCard;