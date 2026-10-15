import { useEffect, useState } from 'react';
import '../styles/AddItemForm.css'

const AddItemForm = ({ addItem, setAddForm, editingId, editingItem, updateItem, setEdd }) => {
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const checkTag = (tag) => {
        return typeof tag === 'string' && tag.trim().length > 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const separatedTags = tags.split(',').map((tag) => {
            return tag.trim().toLowerCase();
        }).filter(checkTag);
        if (editingId) {
            updateItem(title, notes, separatedTags, imageUrl)
        } else {
            addItem(title, separatedTags, notes, imageUrl);
        }
        setTitle('');
        setTags('');
        setNotes('');
        setImageUrl('');
    };

    useEffect(() => {
        if (editingItem) {
            setTitle(editingItem.title);
            setNotes(editingItem.notes);
            setTags(editingItem.tags.join(', '));
            setImageUrl(editingItem.image || '');
        } else {
            setTitle('');
            setTags('');
            setNotes('');
            setImageUrl('');
        }
    }, [editingItem]);

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