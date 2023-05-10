import React from 'react';
import './App.css';
import {BrowserRouter,  Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar'
import Login from './pages/login';
import Register from './pages/register';


function App() {
  
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Login}/>
          <Route path='/register' Component={Register}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
