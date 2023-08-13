import { useState } from 'react'
import '../App.css'
import Jumbotron from '../components/jumbotron'
import CardRender from '../components/cardRender';
import { ICard } from '../types/card';
import Button from '../components/button';
import TutorialPractice from '../components/tutorialPractice';



export default function Lobby() {
    
    return (
    <div>
        <div className='height-fit w-screen grid grid-col-1 bg-gray-900 space-y-2'>
            <div className='min-h-screen flex items-center justify-center grid font-bold motion-safe:animate-fadeIn animate-bounce'>
                <Jumbotron />
            </div>
            <div id='how-to' className='min-h-screen max-w-screen flex flex-col justify-center items-center font-bold space-y-3'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 flex items-center w-screen space-y-5 px-5'>
                    <div className='w-full h-full flex flex-col justify-center'>
                        <div className="">
                            <TutorialPractice />
                        </div>
                    </div>

                    <div className='w-full pb-6 px-4 mx-auto text-center pt-6 space-y-3'>
                        <h2 className='text-3xl font-bold text-white'>
                            Quality Study Habits Built-in
                        </h2>
                        <p className='mb-8 text-lg font-normal sm:px-16 text-gray-400 w-full'>
                            StudyBuddy combines two simple concepts: active recall and refining your problem set. 
                            The two-sided nature of the card forces you to try and remember what the answer is without being prompted. 
                            In order to move onto the next card you'll have to select whether you knew the answer or not. StudyBuddy will then filter out 
                            questions you've already answered correctly and only show you the questions you haven't yet mastered.
                        </p>
                    </div>
                </div> 
                <div className='flex justify-center w-screen md:pt-6 pb-6 lg:pt-20'>
                    <a href='/register' className="inline-flex text-3xl font-bold block justify-center items-center py-6 w-10/12 md:w-3/5 text-center rounded-lg border border-gray-500 focus:ring-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-gray-800">
                        Register Now
                    </a>  
                </div>
            </div>
        </div>
    </div>
    )
}