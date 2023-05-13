import React from 'react';
import './App.css';
import {BrowserRouter,  Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar'
import Lobby from './pages/lobby';
import Login from './pages/login';
import Register from './pages/register';


function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' Component={Lobby}/>
          <Route path='/login' Component={Login}/>
          <Route path='/register' Component={Register}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
