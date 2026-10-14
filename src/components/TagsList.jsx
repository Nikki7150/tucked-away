import { useState } from 'react';
import '../styles/TagsList.css'

const TagsList = ({ noRepeatTags }) => {
    return (
        <div className='tags-list'>
            <h3>Tags</h3>
            {noRepeatTags.map((tag) => (
                <p key={tag} className='tags-names'>{tag}</p>
            ))}
        </div>
    );
};

export default TagsList;