import React from 'react';
import '../App.css';
import {useState} from 'react';
import { NavLink } from "react-router-dom";


interface NavLinkProps {
    DisplayTag : string;
    Location : string;
}



const NavLinkStyled = ({DisplayTag : displayTag, Location : location} : NavLinkProps) =>{
    const navLinkDefaultStyles = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    const navLinkActiveStyles = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white md:dark:hover:bg-transparent bg-blue-500 md:bg-transparent md:text-blue-500"
    return (   
    <li>
        <NavLink to={location} 
            className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? navLinkActiveStyles : navLinkDefaultStyles}> 
                    {displayTag} 
        </NavLink>
    </li>
    );
}


export default function Navbar() {
    //Set state for hiding/showing mobile menu popup
    const [hiding, setHiding] = useState(true)

    const handleClick = () => {setHiding(hiding => !hiding)}

    return (
    <div className="sticky top-0 w-full">
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-600 border-b">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href='/' className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">StudyBuddy</span>
            </a>
            <button onClick={handleClick} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
            <div className={(hiding ? "hidden " : "") + "w-full md:block md:w-auto"} id="navbar-default" >
                <ul id='navbar' className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        
                    <NavLinkStyled DisplayTag='Login' Location='/login'/>
                    <NavLinkStyled DisplayTag='Register' Location='/register'/>
                    <NavLinkStyled DisplayTag='Decks' Location='/decks'/>
                
                </ul>
            </div>
        </div>
        </nav>
    </div>
    )
}