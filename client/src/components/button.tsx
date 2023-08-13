import React from 'react';
import '../App.css';


interface ButtonProps{
  displayTag : string;
  clickHandler : (event : React.MouseEvent<HTMLButtonElement>) => void
}


export default function Button({displayTag, clickHandler} : ButtonProps){
  return (
  <button onClick={clickHandler} className='text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 sm:px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>{displayTag}</button>
  )
}