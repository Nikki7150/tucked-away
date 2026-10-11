import '../styles/SavedItem.css'
import SavedItemCard from './SavedItemCard';
import sampleItem from '../data/sampleItems';

const SavedItemGrid = () => {
    return (
        <div className="saved-grid-container">
            {sampleItem.map((item) => (
                <SavedItemCard 
                    key={item.id}
                    title={item.title}
                    tags={item.tags}
                    notes={item.notes}
                    image={item.image}
                />
            ))}
        </div>
    );
};

export default SavedItemGrid;