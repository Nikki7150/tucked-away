import '../styles/SavedItem.css'
import SavedItemCard from './SavedItemCard';

const SavedItemGrid = ({ query, items }) => {
    const filteredItems = items.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        item.notes.toLowerCase().includes(query.toLowerCase());
    });
    return (
        <div className="saved-grid-container">
            {filteredItems.map((item) => (
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