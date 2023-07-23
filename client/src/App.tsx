import React from 'react';
import './App.css';
import {BrowserRouter,  Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar'
import Lobby from './pages/lobby';
import Login from './pages/login';
import Register from './pages/register';
import Practice from './pages/practice';
import DeckLobby from './pages/deckLobby';
import EditDeck from './pages/editDeck';


function App() {
  
  return (
    <div className='bg-gray-900 h-screen'>
      <BrowserRouter>
        <div className='z-50'>
          <Navbar />
        </div>
        <Routes>
          <Route path='/' Component={Lobby}/>
          <Route path='/login' Component={Login}/>
          <Route path='/register' Component={Register}/>
          <Route path='/practice/:deckID' Component={Practice}/>
          <Route path='/edit-deck/:deckID' Component={EditDeck}/>
          <Route path='/decks' Component={DeckLobby}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
