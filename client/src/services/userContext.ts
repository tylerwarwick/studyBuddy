import React from 'react';
import { IUser } from '../types/user'
type ContextType = {
    user: IUser | null;
    setUser : React.Dispatch<React.SetStateAction<IUser | null>>
    
  };
  
  const ContextState = {
    user: null,
    setUser : () => {}
  };
  
  const UserContext = React.createContext<ContextType>(ContextState)
  export { UserContext };