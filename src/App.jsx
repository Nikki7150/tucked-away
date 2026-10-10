import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import SavedItemGrid from './components/SavedItemGrid.jsx';

function App() {
  return (
    <div className='app-contents'>
      <Header />
      <SavedItemGrid />
    </div>
  )
}

export default App
