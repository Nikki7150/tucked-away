import '../styles/SearchBar.css'
import { IoFilter } from "react-icons/io5";
import TagsList from './TagsList';

const SearchBar = ({ query, setQuery, setTagsList, tagsList, noRepeatTags, selectedTag, setSelectedTag }) => {
    return (
        <div className="search-bar-wrapper">
            <div className="search-bar-container">
                <input 
                    type='text'
                    placeholder='search for cards...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className='search-bar'
                />
                <button onClick={() => setTagsList(!tagsList)} className={`filter-button ${selectedTag ? 'true' : ''}`}><IoFilter /></button>
            </div>
            {tagsList && <TagsList noRepeatTags={noRepeatTags} setSelectedTag={setSelectedTag} selectedTag={selectedTag} />}
        </div>
    );
};

export default SearchBar;