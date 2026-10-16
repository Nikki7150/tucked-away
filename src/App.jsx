import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import SavedItemGrid from './components/SavedItemGrid.jsx';
import sampleItem from './data/sampleItems.js';
import AddItemForm from './components/AddItemForm.jsx';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig.js';

function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(sampleItem);
  const [addForm, setAddForm] = useState(false);
  const [tagsList, setTagsList] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in: ', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

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

  const clearFilters = () => {
    setQuery('');
    setSelectedTag('');
    setShowFavorites(false);
  };

  const editingItem = items.find(item => item.id === editingId);

  const updateItem = (title, notes, tags, imageUrl) => {
    setItems((prevItems) => prevItems.map((item) => 
      item.id === editingId ? {
        ...item, 
        notes: notes, 
        title: title, 
        image: imageUrl, 
        tags: tags
      } : item));
    setAddForm(false);
    setEditingId(null);
  }

  return (
    <div className='app-contents'>
      {loading && (
        <p>Loading...</p>
      )}
      {user === null ? (
        <>
          <h1>Tucked Away</h1>
          <p>Your archive of random things</p>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      ) : (
        <>
          <Header query={query} setQuery={setQuery} setAddForm={setAddForm} setShowFavorites={setShowFavorites} setTagsList={setTagsList} tagsList={tagsList} noRepeatTags={noRepeatTags} setSelectedTag={setSelectedTag} selectedTag={selectedTag} setEditingId={setEditingId} />
        <SavedItemGrid query={query} items={items} setItems={setItems} deleteItem={deleteItem} showFavorites={showFavorites} toggleFavorite={toggleFavorite} selectedTag={selectedTag} clearFilters={clearFilters} setEditingId={setEditingId} setAddForm={setAddForm} />
        {addForm && (
          <AddItemForm addItem={addItem} setAddForm={setAddForm} editingId={editingId} editingItem={editingItem} updateItem={updateItem} setEditingId={setEditingId} />
        )}
        </>
      )}
    </div>
  );
}

export default App
