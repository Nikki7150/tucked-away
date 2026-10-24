import '../styles/TagsList.css'

const TagsList = ({ noRepeatTags, setSelectedTag, selectedTag }) => {
    return (
        <div className='tags-list'>
            <h3 className='tag-heading'>Tags</h3>
            {noRepeatTags.map((tag) => (
                <button key={tag} className={`tags-names ${selectedTag === tag ? 'true' : ''}`} onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}>{tag}</button>
            ))}
        </div>
    );
};

export default TagsList;