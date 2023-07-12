import React from 'react';
import './App.css';
import {BrowserRouter,  Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar'
import Lobby from './pages/lobby';
import Login from './pages/login';
import Register from './pages/register';
import Practice from './pages/practice';
import Decks from './pages/decks';


function App() {
  
  return (
    <div className='overflow-hidden'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' Component={Lobby}/>
          <Route path='/login' Component={Login}/>
          <Route path='/register' Component={Register}/>
          <Route path='/practice' Component={Practice}/>
          <Route path='/deck' Component={Decks}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
