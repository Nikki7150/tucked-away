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
  return (
    <div className='app-contents'>
      <Header query={query} setQuery={setQuery} setAddForm={setAddForm} />
      <SavedItemGrid query={query} items={items} setItems={setItems} />
      {addForm && (
        <AddItemForm />
      )}
    </div>
  );
}

export default App
