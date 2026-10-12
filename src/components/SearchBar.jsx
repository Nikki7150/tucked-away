import '../styles/SearchBar.css'

const SearchBar = ({ query, setQuery }) => {
    return (
        <div className="search-bar-container">
            <input 
                type='text'
                placeholder='search for cards...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <p>Filter</p>
        </div>
    );
};

export default SearchBar;