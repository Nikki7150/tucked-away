import { useState } from 'react';
import '../styles/AddItemForm.css'

const AddItemForm = ({ addItem, setAddForm }) => {
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
        addItem(title, separatedTags, notes, imageUrl);
        setTitle('');
        setTags('');
        setNotes('');
        setImageUrl('');
    };

    return (
        <div className='add-form-container' onClick={() => setAddForm(false)}>
            <form className='add-form' onSubmit={handleSubmit}>
                <h1>Add Item</h1>
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
                <button type='submit'>Add Item</button>
            </form>
        </div>
    );
};

export default AddItemForm;