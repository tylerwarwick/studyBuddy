import React from 'react';
import './App.css';
import {BrowserRouter,  Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar'
import Lobby from './pages/lobby';
import Login from './pages/login';
import Register from './pages/register';
import Practice from './pages/practice';
import Deck from './pages/deck';
import DeckLobby from './pages/deckLobby';


function App() {
  
  return (
    <div className='overflow-hidden h-screen bg-gray-900'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' Component={Lobby}/>
          <Route path='/login' Component={Login}/>
          <Route path='/register' Component={Register}/>
          <Route path='/practice' Component={Practice}/>
          <Route path='/deck' Component={Deck}/>
          <Route path='/test' Component={DeckLobby}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
