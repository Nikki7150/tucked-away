import '../styles/SearchBar.css'
import { IoFilter } from "react-icons/io5";
import TagsList from './TagsList';

const SearchBar = ({ query, setQuery, setTagsList, tagsList, noRepeatTags }) => {
    return (
        <div className="search-bar-wrapper">
            <div className="search-bar-container">
                <input 
                    type='text'
                    placeholder='search for cards...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={() => setTagsList(!tagsList)}><IoFilter /></button>
            </div>
            {tagsList && <TagsList noRepeatTags={noRepeatTags} />}
        </div>
    );
};

export default SearchBar;