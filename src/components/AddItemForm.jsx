import { useEffect, useState } from 'react';
import '../styles/AddItemForm.css'
import { cleanUrl } from '../utils/url';
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";

const AddItemForm = ({ addItem, setAddForm, editingId, editingItem, updateItem, setEditingId }) => {
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [destinationUrl, setDestinationUrl] = useState('');

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
            updateItem({ title, tags: separatedTags, destination: cleanedUrl || '', notes, image: imageUrl });
        } else {
            const result = await addItem({ title, tags: separatedTags, destination: cleanedUrl || '', notes, image: imageUrl });
            if (result.success) {
                setTitle('');
                setTags('');
                setNotes('');
                setImageUrl('');
                setDestinationUrl('');
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
        } else {
            setTitle('');
            setTags('');
            setNotes('');
            setImageUrl('');
            setDestinationUrl('');
        }
    }, [editingItem]);

    const cleanedUrl = cleanUrl(destinationUrl);

    return (
        <div className='add-form-container'>
            <form className='add-form' onSubmit={handleSubmit}>
                <h1>{editingItem ? 'Edit Item' : 'Add Item'}</h1>
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
                <button type='button' onClick={() => { setAddForm(false); setEditingId(null); }}>Cancel</button>
                <button type='submit'>{editingItem ? 'Save changes' : 'Add new card'}</button>
            </form>
        </div>
    );
};

export default AddItemForm;