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
    <div className='overflow-hidden h-screen bg-gray-900'>
      <BrowserRouter>
        <Navbar />
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
