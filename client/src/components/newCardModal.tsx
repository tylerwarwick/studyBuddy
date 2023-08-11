import "../App.css"
import Button from "./button"
import { useRef } from "react"
import { ICard } from "../types/card";
import axios from "axios";


interface Props {
    setHidden: React.Dispatch<React.SetStateAction<boolean>>
    newCard: (question: string, answer: string) => void
}




export const NewCardModal = ({setHidden : setHidden, newCard: newCard} : Props) => {
    const questionRef = useRef<HTMLTextAreaElement>(null);
    const answerRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        //Pass question and answer along to update backend and frontend
        newCard(questionRef.current!.value, answerRef.current!.value);
        
        setHidden(true)
        questionRef.current!.value = '';
        answerRef.current!.value = '';
        
    }


    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
            
            <div className="relative rounded-lg shadow border-2 border-gray-600 bg-gray-700">
                
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-white">
                        Add New Card
                    </h3>
                    <button onClick={() => setHidden(true)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                
            <form onSubmit={(event)=>{handleSubmit(event)}}>
                <div className="p-6 space-y-6">
                            
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Question</label>
                    <textarea ref={questionRef} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>

                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Answer</label>
                    <textarea ref={answerRef} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                            
                </div>
                
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="submit" className='text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>Create New Card</button>
                    <button onClick={() => setHidden(true)} type="button" className="focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 dark:text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">Cancel</button>
                </div>
            </form>

            </div>
        </div>
    </div>
    )
}