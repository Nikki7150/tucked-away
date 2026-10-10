import '../styles/SavedItem.css'
import SavedItemCard from './SavedItemCard';

const SavedItemGrid = () => {
    return (
        <div className="saved-grid-container">
            <SavedItemCard />
            <div className="saved-card-container">
                <img src="https://example.com" class="dynamic-img" alt="Product Image" />
                <h2>Free CSS stuff</h2>
                <div className='tags'>
                    <p>Coding</p>
                    <p>CSS</p>
                    <p>Free stuff</p>
                </div>
                <p>found this when searcfhing for a tut. its soo convenient</p>
            </div>
            <div className="saved-card-container">
                <img src="https://example.com" class="dynamic-img" alt="Product Image" />
                <h2>Free CSS stuff</h2>
                <div className='tags'>
                    <p>Coding</p>
                    <p>CSS</p>
                    <p>Free stuff</p>
                </div>
                <p>found this when searcfhing for a tut. its soo convenient</p>
            </div>
            <SavedItemCard />
            <div className="saved-card-container">
                <img src="https://example.com" class="dynamic-img" alt="Product Image" />
                <h2>Free CSS stuff</h2>
                <div className='tags'>
                    <p>Coding</p>
                    <p>CSS</p>
                    <p>Free stuff</p>
                </div>
                <p>found this when searcfhing for a tut. its soo convenient</p>
            </div>
            
        </div>
    );
};

export default SavedItemGrid;