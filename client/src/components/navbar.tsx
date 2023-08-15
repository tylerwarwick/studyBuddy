import React, { useContext } from 'react';
import '../App.css';
import {useState} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from '../services/userContext';
import LoginService from '../services/loginService';


interface NavLinkProps {
    displayTag : string;
    location : string;
}



const NavLinkStyled = ({displayTag: displayTag, location: location} : NavLinkProps) =>{
    return (   
    <li>
        <NavLink to={location} 
            className={({ isActive, isPending }) =>
            isPending ? "pending" : (isActive ? 'bg-blue-500 md:bg-transparent md:text-blue-500 ' : '') + 'block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent md:bg-transparent'}> 
                    {displayTag} 
        </NavLink>
    </li>
    );
}


export default function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()

    //Set state for hiding/showing mobile menu popup
    const [hiding, setHiding] = useState(true)

    const handleClick = () => {setHiding(hiding => !hiding)}

    
    return (
    <div className="sticky top-0 w-full">
        <nav className="bg-gray-900 border-gray-600 border-b">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href={'/'} className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white hover:text-blue-500">StudyBuddy</span>
            </a>
            <button onClick={handleClick} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
            <div className={(hiding ? "hidden " : "") + "w-full md:block md:w-auto"} id="navbar-default" >
                <ul id='navbar' className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent bg-gray-800 md:bg-gray-900 border-gray-700">
                    {(user === null) ? (<>
                    <NavLinkStyled displayTag='Login' location='/login'/>
                    <NavLinkStyled displayTag='Register' location='/register'/>
                    </>) : ( <>
                        <NavLinkStyled displayTag='Decks' location='/decks'/>
                        <NavLink to={'/login'} onClick={()=> {LoginService.logout(); setUser(null)}}
                            className={({ isActive, isPending }) =>
                            isPending ? "pending" : (isActive ? 'bg-blue-500 md:bg-transparent md:text-blue-500 ' : '') + 'block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent md:bg-transparent'}> 
                                    Logout
                        </NavLink>
                    </>)}
                </ul>
            </div>
        </div>
        </nav>
    </div>
    )
}