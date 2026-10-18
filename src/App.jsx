import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import SavedItemGrid from './components/SavedItemGrid.jsx';
import AddItemForm from './components/AddItemForm.jsx';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig.js';
import ProfileModal from './components/ProfileModal.jsx';
import { FaCircleUser } from "react-icons/fa6";
import { DiLaravel } from 'react-icons/di';
import { subscribeToItems, addCard, deleteCard, updateCard } from './userData.js';

function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [tagsList, setTagsList] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileModal, setProfileModal] = useState(false);

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
      setProfileModal(false);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = subscribeToItems(user.uid, setItems);
    return () => unsubscribe();
  }, [user?.uid]);

  const addItem = async (title, tags, notes, imageUrl) => {
    const newItems = {
      title: title,
      tags: tags,
      notes: notes,
      image: imageUrl,
      favorite: false,
    };
    try {
      await addCard(user.uid, newItems);
      setAddForm(false);
      return { success: true };
    } catch (error) {
      console.error("Error adding card: ", error);
      return { success: false, error: error.message };
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await deleteCard(user.uid, id);
      } catch (error) {
        console.error("Error deleting card: ", error);
      }
    }
  };

  const toggleFavorite = async (id) => {
    try {
      const item = items.find((item) => item.id === id);
      await updateCard(user.uid, id, { favorite: !item.favorite });
    } catch (error) {
      console.error("Error toggling favorite card: ", error);
    }
  };

  const allTags = items.flatMap(item => item.tags || []);
  const noRepeatTags = [...new Set(allTags)];

  const clearFilters = () => {
    setQuery('');
    setSelectedTag('');
    setShowFavorites(false);
  };

  const editingItem = items.find(item => item.id === editingId);

  const updateItem = async (title, notes, tags, imageUrl) => {
    try {
      await updateCard(user.uid, editingId, {title, notes, tags, image: imageUrl});
      setAddForm(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating card: ", error);
    }
  }

  return (
    <div className='app-contents'>
      {loading ? (
        <div className='loading-page'>
          <p className='loading-state'>Loading...</p>
        </div>
      ) : user === null ? (
        <div className='signed-out-screen'>
          <h1>Tucked Away</h1>
          <p>Your archive of random things</p>
          <button onClick={() => signIn()}>Sign In</button>
        </div>
      ) : (
        <div className='home-screen'>
          <div className="header">
            <p>Tucked Away</p>
            <Header query={query} setQuery={setQuery} setAddForm={setAddForm} setShowFavorites={setShowFavorites} setTagsList={setTagsList} tagsList={tagsList} noRepeatTags={noRepeatTags} setSelectedTag={setSelectedTag} selectedTag={selectedTag} setEditingId={setEditingId} />
            {user.photoURL ? (
              <button className='open-profile' onClick={() => setProfileModal(true)} style={{ backgroundImage: `url(${user?.photoURL})`, backgroundSize: 'cover' }} alt={`${user.displayName}'s profile picture to open profile`}></button>
            ) : (
              <button className='open-profile' onClick={() => setProfileModal(true)} >
                <p className='fallback-open-profile-text'>{user.displayName.charAt(0) || user.email.charAt(0)}</p>
              </button>
            )}
          </div>
          {profileModal && (
            <ProfileModal setProfileModal={setProfileModal} handleSignOut={handleSignOut} user={user} />
          )}
          <SavedItemGrid query={query} items={items} setItems={setItems} deleteItem={deleteItem} showFavorites={showFavorites} toggleFavorite={toggleFavorite} selectedTag={selectedTag} clearFilters={clearFilters} setEditingId={setEditingId} setAddForm={setAddForm} />
          {addForm && (
            <AddItemForm addItem={addItem} setAddForm={setAddForm} editingId={editingId} editingItem={editingItem} updateItem={updateItem} setEditingId={setEditingId} />
          )}
        </div>
      )}
    </div>
  );
}

export default App
