import '../App.css';
import {useState} from 'react';
import StudyCard from '../components/studyCard';
import Button from '../components/button';



export default function Practice() {

    return (
        <div className='bg-gray-900 h-screen flex flex-col space-y-3 items-center justify-center'>
            <div className='select-none'>
                <StudyCard Question='What is the powerhouse of the cell?' Answer='Mitochondria' IsKnown={false} />
            </div>
            <div className='space-x-3'>
                <Button displayTag="I don't know it"></Button>
                <Button displayTag='I know it'></Button>
            </div>
        </div>
    );
}