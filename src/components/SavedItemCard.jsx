import '../styles/SavedItem.css'
import { CiTrash, CiEdit } from "react-icons/ci";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaLink } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import PALETTE, { getColorIndex } from '../utils/palette';

const SavedItemCard = ({ id, title, tags, notes, destination, image, deleteItem, favorite, colorIndex, toggleFavorite, setEditingId, setAddForm }) => {
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

    const colorEntry = PALETTE[getColorIndex(id, colorIndex)];

    return (
        <div className="saved-card-container" onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ backgroundColor: colorEntry.bg, color: colorEntry.text, }}>
            {image && !imageFailed && (
                <img className='card-image' src={image} alt={title} onError={() => setImageFailed(true)} />
            )}
            <button className='favorite-card-button' onClick={() => toggleFavorite(id)} aria-label='favorite'>{favorite ? <IoMdHeart /> :<IoMdHeartEmpty />}</button>
            <h2 className='card-title'>{title}</h2>
            <div className='tags'>
                {(tags || []).map((tag) => (
                    <p key={tag} className='card-tag'>
                        {tag}
                    </p>
                ))}
            </div>
            {destination && (
                <a href={destination} target='_blank' rel='noopener noreferrer' className='destination-link'><FaLink /> <span>{destination}</span></a>
            )}
            <p className='card-notes'>{notes}</p>
            <div className='card-buttons'>
                <button className='card-delete' onClick={() => deleteItem(id)} aria-label='delete card'><CiTrash /></button>
                <button className='card-edit' onClick={() => { setEditingId(id); setAddForm(true); }} aria-label='edit card'><CiEdit /></button>
            </div>
        </div>
    );
};

export default SavedItemCard;