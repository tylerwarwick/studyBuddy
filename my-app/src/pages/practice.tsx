import '../App.css';
import {useState} from 'react';
import RenderedCard from '../components/renderedCard';
import Button from '../components/button';
import { Card } from '../components/renderedCard';


interface CardProps {
    cards : Card[];
}


const Practice = () => {
    let i = 0;
    return (
        <div className='bg-gray-900 h-screen flex flex-col space-y-3 items-center justify-center'>
            <div className='select-none'>
                <RenderedCard question={''} answer={''} isKnown={false} />
            </div>
            <div className='space-x-3'>
                <Button displayTag="I don't know it"></Button>
                <Button displayTag='I know it'></Button>
            </div>
        </div>
    );
}

export default Practice;