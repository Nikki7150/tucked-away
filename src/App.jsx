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

  const addItem = (title, tags, notes, imageUrl) => {
    const newItems = {
      id: Date.now(),
      title: title,
      tags: tags,
      notes: notes,
      image: imageUrl,
    };
    setItems((previtems) => [...previtems, newItems]);
    setAddForm(false);
  };

  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  return (
    <div className='app-contents'>
      <Header query={query} setQuery={setQuery} setAddForm={setAddForm} />
      <SavedItemGrid query={query} items={items} setItems={setItems} deleteItem={deleteItem} />
      {addForm && (
        <AddItemForm addItem={addItem} setAddForm={setAddForm} />
      )}
    </div>
  );
}

export default App
