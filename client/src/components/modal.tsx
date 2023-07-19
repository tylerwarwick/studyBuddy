import { MouseEvent, useState } from "react";
import "../App.css"
import Button from "./button";
import { Card } from "../pages/editDeck";

interface ModalProps {
    updateCard : () => void

    //True means hide, false means show
    modalMode : (bool : boolean) => void

    question : string;
    answer : string;

    setQuestion : (question : string) => void;
    setAnswer : (answer : string) => void

}


export default function Modal({updateCard, modalMode, question, answer, setQuestion, setAnswer} : ModalProps){


    const onSave = () => {
        //******  Update Backend here */



        updateCard();
        modalMode(true);
    }

    return (

    <div className="fixed inset-0 flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
            
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit Card
                    </h3>
                    <button onClick={() => modalMode(true)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                            
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Question</label>
                    <textarea onChange={(event) => {setQuestion(event.target.value)}} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={question}></textarea>

                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Answer</label>
                    <textarea onChange={(event) => {setAnswer(event.target.value)}} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={answer}></textarea>
                            
                </div>
                
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <Button displayTag={"Save"} clickHandler={() => onSave()} />
                    <button onClick={() => modalMode(true)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                </div>
        

            </div>
        </div>
    </div>

        );
};