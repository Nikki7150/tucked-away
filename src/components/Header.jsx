import '../styles/Header.css'
import SearchBar from './SearchBar';

const Header = () => {
    return (
        <header className="header-container">
            <h2 className="app-name">Tucked Away</h2>
            <SearchBar />
            <button aria-label='add-button'>+</button>
            <button aria-label='favourites-button'>❤︎⁠</button>
        </header>
    );
};

export default Header;