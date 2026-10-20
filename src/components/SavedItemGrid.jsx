import '../styles/SavedItem.css'
import SavedItemCard from './SavedItemCard';

const SavedItemGrid = ({ query, items, deleteItem, showFavorites, toggleFavorite, selectedTag, clearFilters, setEditingId, setAddForm, itemsLoading }) => {
    const filteredItems = items.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        item.notes.toLowerCase().includes(query.toLowerCase())
    })
    .filter((item) => !showFavorites || item.favorite)
    .filter((item) => !selectedTag || item.tags.includes(selectedTag));

    const isEmpty = filteredItems.length === 0;

    const message = items.length === 0 ? "Nothing saved yet" :
                    showFavorites? "No favorites" :
                    "Nothing matches your search";

    const filtersActive = query !== '' || selectedTag !== '' || showFavorites;

    return (
        <div className={`saved-grid-container${isEmpty ? ' empty-state' : ''}`}>
            {filteredItems.map((item) => (
                <SavedItemCard 
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    tags={item.tags}
                    notes={item.notes}
                    image={item.image}
                    destination={item.destination}
                    deleteItem={deleteItem}
                    favorite={item.favorite}
                    toggleFavorite={toggleFavorite}
                    setEditingId={setEditingId}
                    setAddForm={setAddForm}
                />
            ))}
            {isEmpty && !itemsLoading && (
                <div className="empty-state-div">
                    <h2 className="empty-text">{message}</h2>
                    {filtersActive && items.length !== 0 && (
                        <button onClick={clearFilters} className='clear-filters'>Clear Filters</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default SavedItemGrid;