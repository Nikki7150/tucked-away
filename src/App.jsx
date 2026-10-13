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
  }

  return (
    <div className='app-contents'>
      <Header query={query} setQuery={setQuery} setAddForm={setAddForm} />
      <SavedItemGrid query={query} items={items} setItems={setItems} />
      {addForm && (
        <AddItemForm addItem={addItem} />
      )}
    </div>
  );
}

export default App
