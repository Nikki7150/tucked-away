import '../styles/TagsList.css'

const TagsList = ({ noRepeatTags, setSelectedTag, selectedTag }) => {
    return (
        <div className='tags-list'>
            <h3>Tags</h3>
            {noRepeatTags.map((tag) => (
                <button key={tag} className='tags-names' onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}>{tag}</button>
            ))}
        </div>
    );
};

export default TagsList;