import '../styles/SavedItem.css'
import { CiTrash, CiEdit } from "react-icons/ci";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaLink } from "react-icons/fa6";
import { useEffect, useState } from 'react';

const SavedItemCard = ({ id, title, tags, notes, destination, image, deleteItem, favorite, toggleFavorite, setEditingId, setAddForm }) => {
    const [imageFailed, setImageFailed] = useState(false);
    useEffect(() => {
        setImageFailed(false);
    },[image]);

    const handleMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        e.currentTarget.style.setProperty('--ry', `${x * 20}deg`);
        e.currentTarget.style.setProperty('--rx', `${-y * 20}deg`);
        e.currentTarget.style.setProperty('--scale', '1.02');
    }

    const handleLeave = (e) => {
        e.currentTarget.style.setProperty('--ry', '0deg');
        e.currentTarget.style.setProperty('--rx', '0deg');
        e.currentTarget.style.setProperty('--scale', '1');
    }

    const PALETTE = ['#ddd3c9', '#ecc4c3', '#b97d7b', '#928e5e'];
    const randomColor = PALETTE[Math.floor(Math.random() * PALETTE.length)];

    return (
        <div className="saved-card-container" onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ backgroundColor: randomColor }}>
            {image && !imageFailed && (
                <img src={image} alt={title} onError={() => setImageFailed(true)} />
            )}
            <button onClick={() => toggleFavorite(id)} aria-label='favorite'>{favorite ? <IoMdHeart /> :<IoMdHeartEmpty />}</button>
            <h2>{title}</h2>
            <div className='tags'>
                {(tags || []).map((tag) => (
                    <p key={tag}>
                        {tag}
                    </p>
                ))}
            </div>
            {destination && (
                <a href={destination} target='_blank' rel='noopener noreferrer' className='destination-link'><FaLink /> <span>{destination}</span></a>
            )}
            <p>{notes}</p>
            <button onClick={() => deleteItem(id)} aria-label='delete card'><CiTrash /></button>
            <button onClick={() => { setEditingId(id); setAddForm(true); }} aria-label='edit card'><CiEdit /></button>
        </div>
    );
};

export default SavedItemCard;