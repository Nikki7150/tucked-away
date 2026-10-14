import '../styles/SavedItem.css'
import SavedItemCard from './SavedItemCard';

const SavedItemGrid = ({ query, items, deleteItem, showFavorites, toggleFavorite }) => {
    const filteredItems = items.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        item.notes.toLowerCase().includes(query.toLowerCase())
    })
    .filter((item) => !showFavorites || item.favorite);
    return (
        <div className="saved-grid-container">
            {filteredItems.map((item) => (
                <SavedItemCard 
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    tags={item.tags}
                    notes={item.notes}
                    image={item.image}
                    deleteItem={deleteItem}
                    favorite={item.favorite}
                    toggleFavorite={toggleFavorite}
                />
            ))}
        </div>
    );
};

export default SavedItemGrid;