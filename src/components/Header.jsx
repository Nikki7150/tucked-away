import '../styles/Header.css'
import SearchBar from './SearchBar';

const Header = ({ query, setQuery, setAddForm, setShowFavorites, setTagsList, tagsList, noRepeatTags, setSelectedTag, selectedTag, setEditingId }) => {
    return (
        <header className="header-container">
            <h2 className="app-name">Tucked Away</h2>
            <SearchBar query={query} setQuery={setQuery} setTagsList={setTagsList} tagsList={tagsList} noRepeatTags={noRepeatTags} setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
            <button aria-label='add-button' onClick={() => { setEditingId(null); setAddForm(true); }}>+</button>
            <button aria-label='favourites-button' onClick={() => setShowFavorites((prev) => !prev)}>❤︎⁠</button>
        </header>
    );
};

export default Header;