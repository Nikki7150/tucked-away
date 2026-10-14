import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import SavedItemGrid from './components/SavedItemGrid.jsx';
import sampleItem from './data/sampleItems.js';
import AddItemForm from './components/AddItemForm.jsx';

function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(sampleItem);
  const [addForm, setAddForm] = useState(false);
  const [tagsList, setTagsList] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');

  const addItem = (title, tags, notes, imageUrl) => {
    const newItems = {
      id: Date.now(),
      title: title,
      tags: tags,
      notes: notes,
      image: imageUrl,
      favorite: false,
    };
    setItems((prevItems) => [...prevItems, newItems]);
    setAddForm(false);
  };

  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const toggleFavorite = (id) => {
    setItems((prevItems) => prevItems.map((item) => item.id === id ? {...item, favorite: !item.favorite} : item));
  };

  const allTags = items.flatMap(item => item.tags || []);
  const noRepeatTags = [...new Set(allTags)];

  return (
    <div className='app-contents'>
      <Header query={query} setQuery={setQuery} setAddForm={setAddForm} setShowFavorites={setShowFavorites} setTagsList={setTagsList} tagsList={tagsList} noRepeatTags={noRepeatTags} setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
      <SavedItemGrid query={query} items={items} setItems={setItems} deleteItem={deleteItem} showFavorites={showFavorites} toggleFavorite={toggleFavorite} selectedTag={selectedTag} />
      {addForm && (
        <AddItemForm addItem={addItem} setAddForm={setAddForm} />
      )}
    </div>
  );
}

export default App
