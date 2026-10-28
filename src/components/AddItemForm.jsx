import { useEffect, useState } from 'react';
import '../styles/AddItemForm.css'
import { cleanUrl } from '../utils/url';
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import PALETTE, { getColorIndex } from '../utils/palette';
import { IoMdArrowDropdown } from "react-icons/io";

const AddItemForm = ({ addItem, setAddForm, editingId, editingItem, updateItem, setEditingId }) => {
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [destinationUrl, setDestinationUrl] = useState('');
    const [colorIndex, setColorIndex] = useState(null);
    const [colorOpen, setColorOpen] = useState(false);

    const checkTag = (tag) => {
        return typeof tag === 'string' && tag.trim().length > 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (destinationUrl.trim() && !cleanedUrl) return;
        const separatedTags = tags.split(',').map((tag) => {
            return tag.trim().toLowerCase();
        }).filter(checkTag);
        if (editingId) {
            updateItem({ title, tags: separatedTags, destination: cleanedUrl || '', notes, image: imageUrl, colorIndex: colorIndex });
        } else {
            const result = await addItem({ title, tags: separatedTags, destination: cleanedUrl || '', notes, image: imageUrl, colorIndex: colorIndex });
            if (result.success) {
                setTitle('');
                setTags('');
                setNotes('');
                setImageUrl('');
                setDestinationUrl('');
                setColorIndex(null);
                setColorOpen(false);
            } else {
                console.error("Failed to submit card: ", result.error);
            }
        }
    };

    useEffect(() => {
        if (editingItem) {
            setTitle(editingItem.title);
            setNotes(editingItem.notes);
            setTags(editingItem.tags.join(', '));
            setImageUrl(editingItem.image || '');
            setDestinationUrl(editingItem.destination || '');
            setColorIndex(getColorIndex(editingItem.id, editingItem.colorIndex))
            setColorOpen(false);
        } else {
            setTitle('');
            setTags('');
            setNotes('');
            setImageUrl('');
            setDestinationUrl('');
            setColorIndex(null);
            setColorOpen(false);
        }
    }, [editingItem]);

    const cleanedUrl = cleanUrl(destinationUrl);

    return (
        <div className='add-form-container'>
            <form className='add-form' onSubmit={handleSubmit}>
                <div className='container'>
                    <h1 className='heading'>{editingItem ? 'Edit Item' : 'Add Item'}</h1>
                    <div className='color-picker-wrap'>
                        <button className='card-color' type='button' onClick={() => {setColorOpen(!colorOpen)}} aria-label='Choose card color'>
                            <div className='swatch' style={{ backgroundColor: typeof colorIndex === 'number' ? PALETTE[colorIndex].bg : '#f9f9f9', }}></div>
                            <IoMdArrowDropdown size={30} />
                        </button>
                        {colorOpen && (
                            <div className='color-picker'>
                                {PALETTE.map((entry, i) => (
                                    <button 
                                        className='swatch'
                                        type='button' 
                                        key={i} 
                                        aria-label={`Color ${i + 1}`} 
                                        aria-pressed={colorIndex === i} 
                                        style={{ backgroundColor: entry.bg }} 
                                        onClick={() => { setColorIndex(i); setColorOpen(false); }}
                                    ></button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <input
                    type='text'
                    required
                    placeholder='Add title...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='General, Free stuff...'
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    required
                />
                <div className='url-div'>
                    <input
                        type='text'
                        placeholder='Add Destination Url...'
                        value={destinationUrl}
                        onChange={(e) => setDestinationUrl(e.target.value)}
                    />
                    {destinationUrl && (
                        <p className='url-checking'>{cleanedUrl ? <CiCircleCheck /> : <RxCrossCircled />}</p>
                    )}
                </div>
                <input
                    type='text'
                    placeholder='Add notes...'
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <input
                    type='url'
                    placeholder='Add Image Url...'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <div className='container'>
                    <button className='cancel-button' type='button' onClick={() => { setAddForm(false); setEditingId(null); }}>Cancel</button>
                    <button className='add-card-button' type='submit'>{editingItem ? 'Save changes' : 'Add new card'}</button>
                </div>
            </form>
        </div>
    );
};

export default AddItemForm;