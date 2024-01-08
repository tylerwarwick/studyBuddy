import { useContext } from 'react';
import '../App.css'
import { UserContext } from '../services/userContext';

export default function Jumbotron(){
    const { user } = useContext(UserContext);

    return (   
    <section className="bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">The Efficient Way to Study</h1>
            <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-gray-400">StudyBuddy is a memorization tool for students. It helps you study extra on the topics you need to, while skipping the stuff you're already great at!</p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <a href={user ? '/decks' : '/register'} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-900">
                    Get started
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
                <a href="#how-to" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg border focus:ring-4 text-white border-gray-700 hover:bg-gray-700 focus:ring-gray-800">
                    Learn more
                </a>  
            </div>
        </div>
    </section>

    );
}