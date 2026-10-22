import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import SavedItemGrid from './components/SavedItemGrid.jsx';
import AddItemForm from './components/AddItemForm.jsx';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig.js';
import ProfileModal from './components/ProfileModal.jsx';
import { subscribeToItems, addCard, deleteCard, updateCard } from './userData.js';
import { IoIosArrowDown } from "react-icons/io";

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
  const [itemsLoading, setItemsLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

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
    if (!user?.uid) { setItems([]); setItemsLoading(true); return; }
    setError('');
    const unsubscribe = subscribeToItems(
      user.uid, 
      (data) => { setItems(data); setItemsLoading(false); },
      () => { setError("Couldn't load your cards. Try refreshing." ); setItemsLoading(false); }
    );
    return () => unsubscribe();
  }, [user?.uid]);

  const addItem = async (data) => {
    const newItems = {
      ...data,
      favorite: false,
    };
    try {
      await addCard(user.uid, newItems);
      setAddForm(false);
      return { success: true };
    } catch (error) {
      console.error("Error adding card: ", error);
      setSaveError("Couldn't save that. Try again.");
      return { success: false, error: error.message };
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await deleteCard(user.uid, id);
      } catch (error) {
        console.error("Error deleting card: ", error);
        setSaveError("Couldn't save that. Try again.");
      }
    }
  };

  const toggleFavorite = async (id) => {
    try {
      const item = items.find((item) => item.id === id);
      await updateCard(user.uid, id, { favorite: !item.favorite });
    } catch (error) {
      console.error("Error toggling favorite card: ", error);
      setSaveError("Couldn't save that. Try again.");
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

  const updateItem = async (data) => {
    try {
      await updateCard(user.uid, editingId, data);
      setAddForm(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating card: ", error);
      setSaveError("Couldn't save that. Try again.");
    }
  }

  useEffect(() => {
    if (!saveError) return;
    const timer = setTimeout(() => setSaveError(''), 4000);
    return () => clearTimeout(timer);
  }, [saveError])

  const showLoading = loading || (user && itemsLoading);



  return (
    <div className='app-contents'>
      {showLoading ? (
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
                <p className='fallback-open-profile-text'>{user.displayName?.charAt(0) || user.email.charAt(0)}</p>
              </button>
            )}
          </div>
          {profileModal && (
            <ProfileModal setProfileModal={setProfileModal} handleSignOut={handleSignOut} user={user} />
          )}
          {error ? (
            <p className='load-error'>{error}</p>
          ) : (
            <div>
              <div className='sorting-button-container'>
                <button onClick={() => setSortOrder((sortOrder === 'newest' ? 'oldest' : 'newest'))} className='sorting-button'>{sortOrder === 'newest' ? 'Sorted: Newest first' : 'Sorted: Oldest first'} <IoIosArrowDown style={{ marginLeft: '10px', }}/></button>
              </div>
              <SavedItemGrid query={query} items={items} setItems={setItems} deleteItem={deleteItem} showFavorites={showFavorites} toggleFavorite={toggleFavorite} selectedTag={selectedTag} clearFilters={clearFilters} setEditingId={setEditingId} setAddForm={setAddForm} itemsLoading={itemsLoading} sortOrder={sortOrder} />
            </div>
          )}
          {addForm && (
            <AddItemForm addItem={addItem} setAddForm={setAddForm} editingId={editingId} editingItem={editingItem} updateItem={updateItem} setEditingId={setEditingId} />
          )}
          {saveError && (
            <div className='save-error' role='alert'>
              <p>{saveError}</p>
              <button onClick={() => setSaveError('')} aria-label='dismiss'>×</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App
