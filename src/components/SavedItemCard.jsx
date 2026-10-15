import '../styles/SavedItem.css'
import { CiTrash, CiEdit } from "react-icons/ci";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

const SavedItemCard = ({ id, title, tags, notes, image, deleteItem, favorite, toggleFavorite, setEditingId, setAddForm }) => {
    return (
        <div className="saved-card-container">
            {image && (
                <img src={image} alt={title} />
            )}
            <button onClick={() => toggleFavorite(id)}>{favorite ? <IoMdHeart /> :<IoMdHeartEmpty />}</button>
            <h2>{title}</h2>
            <div className='tags'>
                {tags.map((tag) => (
                    <p key={tag}>
                        {tag}
                    </p>
                ))}
            </div>
            <p>{notes}</p>
            <button onClick={() => deleteItem(id)} aria-label='delete button'><CiTrash /></button>
            <button onClick={() => { setEditingId(id); setAddForm(true); }} aria-label='edit button'><CiEdit /></button>
        </div>
    );
};

export default SavedItemCard;