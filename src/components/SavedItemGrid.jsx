import '../styles/SavedItem.css'
import SavedItemCard from './SavedItemCard';

const SavedItemGrid = ({ query, items, deleteItem, showFavorites, toggleFavorite, selectedTag, clearFilters, setEditingId, setAddForm, itemsLoading, sortOrder }) => {
    const search = query.toLowerCase();
    const filteredItems = items.filter(item => {
        const title = (item.title || '').toLowerCase();
        const notes = (item.notes || '').toLowerCase();
        const tags = item.tags || [];
        return title.includes(search) ||
            notes.includes(search) ||
            tags.some(tag => tag.toLowerCase().includes(search));
    })
    .filter((item) => !showFavorites || item.favorite)
    .filter((item) => !selectedTag || (item.tags || []).includes(selectedTag));

    const getTime = (item) => {
        if (item.createdAt === null) return Date.now();
        return item.createdAt?.toMillis?.() ?? 0;
    }

    const sortedItems = [...filteredItems].sort((a, b) => 
        sortOrder === 'newest' ? getTime(b) - getTime(a) : getTime(a) - getTime(b)
    );

    const isEmpty = filteredItems.length === 0;

    const message = items.length === 0 ? "Tuck away your first thing" :
                    showFavorites? "No favorites" :
                    "Nothing matches your search";

    const filtersActive = query !== '' || selectedTag !== '' || showFavorites;

    return (
        <div className={`saved-grid-container${isEmpty ? ' empty-state' : ''}`}>
            {sortedItems.map((item) => (
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
                    {items.length === 0 && (
                        <button onClick={() => setAddForm(true)} className='open-add'>+</button>
                    )}
                    {filtersActive && items.length !== 0 && (
                        <button onClick={clearFilters} className='clear-filters'>Clear Filters</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default SavedItemGrid;