import { useState } from 'react';
import '../styles/AddItemForm.css'

const AddItemForm = () => {
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [tag, setTag] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tagForm, setTagForm] = useState(false);
    return (
        <div className='add-form-container'>
            <div className='add-form'>
                <input
                    type='text'
                    placeholder='Add title...'
                    value={title}
                    onChange={setTitle}
                />
                <div className='tags-created'></div>
                <button onClick={() => setTagForm(true)}>Add tags</button>
                <div className='tag-form'>
                    <input
                        type='text'
                        placeholder='Add tag...'
                        value={tag}
                        onChange={setTag}
                    />
                    <button className='add-tag'>+</button>
                </div>
                <input
                    type='text'
                    placeholder='Add notes...'
                    value={notes}
                    onChange={setNotes}
                />
                <input
                    type='url'
                    placeholder='Add Image Url...'
                    value={imageUrl}
                    onChange={setImageUrl}
                />
            </div>
        </div>
    );
};

export default AddItemForm;