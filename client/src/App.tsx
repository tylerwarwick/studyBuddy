import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter,  Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar'
import Lobby from './pages/lobby';
import Login from './pages/login';
import Register from './pages/register';
import Practice from './pages/practice';
import DeckLobby from './pages/deckLobby';
import EditDeck from './pages/editDeck';
import { IUser } from './types/user';
import { UserContext } from './services/userContext';

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userJson : IUser = await JSON.parse(localStorage.getItem("user")!);
      console.log(userJson);
      if (userJson) setUser(() => userJson);
    }

    const foo = async () => {
      await getUser();
      console.log(user);
    }
    
    foo();

    
  
  }, [])

  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className='overflow-clip bg-gray-900'>
        <BrowserRouter>
          <div className='z-50 sticky top-0'>
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
    </UserContext.Provider>
  );
}

export default App;
