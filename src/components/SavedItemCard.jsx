import '../styles/SavedItem.css'
import { CiTrash } from "react-icons/ci";

const SavedItemCard = ({ id, title, tags, notes, image, deleteItem }) => {
    return (
        <div className="saved-card-container">
            {image && (
                <img src={image} alt={title} />
            )}
            <h2>{title}</h2>
            <button onClick={() => deleteItem(id)} aria-label='delete button'><CiTrash /></button>
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