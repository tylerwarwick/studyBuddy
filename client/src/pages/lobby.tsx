import { useState } from 'react'
import '../App.css'
import CardRender from '../components/cardRender'
import Jumbotron from '../components/jumbotron'
import Table from '../components/table'
import { parseJsonSourceFileConfigFileContent } from 'typescript'
import Button from '../components/button'

export default function Lobby() {
    const [cardFace, setFace] = useState(true);

    
    const intervalId = window.setInterval(function(){
        //setFace((cardFace) => !cardFace);
        
      }, 2000);
    
    

    return (
        <div className='height-fit w-screen grid grid-col-1 bg-gray-900 space-y-2'>
            <div className='min-h-screen flex items-center justify-center grid font-bold motion-safe:animate-fadeIn animate-bounce'>
                <Jumbotron />
            </div>
            <div id='how-to' className='min-h-screen max-w-screen flex justify-center items-center font-bold'>
                <div className='grid gird-cols-1 md:grid-cols-2 gap-2 flex items-center w-screen'>
                    <div className='w-full flex flex-col space-y-3 justify-center px-5'>
                        <div className='flex justify-center'>
                            <CardRender displayText={cardFace ? 'What is the powerhouse of the cell?' : 'Mitochondria'} func={() => setFace((cardFace) => !cardFace)} />
                        </div>
                        <div className='space-x-3 flex justify-center'>
                            <Button clickHandler={()=>{}} displayTag="I Don't Know This One"></Button>
                            <Button clickHandler={()=>{}} displayTag='I Know This One'></Button>
                        </div>
                    </div>
                    <div className='w-full py-8 px-4 mx-auto text-center space-y-3'>
                        <h2 className='text-3xl font-bold text-white'>
                            Quality Study Habits Built-in
                        </h2>
                        <p className='mb-8 text-lg font-normal sm:px-16 text-gray-400 w-full'>
                            StudyBuddy combines two simple concepts: active recall and refining your problem set. 
                            The two-sided nature of the card forces you to try and remember what the answer is without being prompted. 
                            From there you will click on either the "I Know This One" or "I Don't Know This One". StudyBuddy will then filter out 
                            questions you've already answered correctly and only show you the questions you haven't yet mastered.
                        </p>
                    </div>
                </div> 
            </div>
        </div>
    )
}