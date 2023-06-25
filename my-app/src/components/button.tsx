import React from 'react';
import '../App.css';


interface ButtonProps{
  displayTag : string;
  clickHandler : (event : React.MouseEvent<HTMLButtonElement>) => void
}


export default function Button({displayTag, clickHandler} : ButtonProps){
  return (
  <button onClick={clickHandler} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>{displayTag}</button>
  )
}