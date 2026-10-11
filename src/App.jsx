import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import SavedItemGrid from './components/SavedItemGrid.jsx';

function App() {
  const [query, setQuery] = useState('');
  return (
    <div className='app-contents'>
      <Header query={query} setQuery={setQuery} />
      <SavedItemGrid query={query} setQuery={setQuery} />
    </div>
  )
}

export default App
