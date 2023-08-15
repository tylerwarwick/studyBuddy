import { MouseEvent, useContext, useState } from "react";
import "../App.css"
import Button from "./button";
import { ICard } from "../types/card";
import { Context } from "../pages/editDeck";
import CardService from "../services/cardService";
import LoginService from "../services/loginService";
import { UserContext } from "../services/userContext";
import { useNavigate } from "react-router-dom";

interface EditModalProps {
    cardId: string;
}


export default function EditModal({cardId: cardId} : EditModalProps){
    const {setEditHidden, cards, setCards, questionText, setQuestionText, answerText, setAnswerText} = useContext(Context)
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    
    const onSave = () => {
        const isknown: boolean = (cards.find((c) => c.id === cardId))?.isKnown!;

        const editCard = async () => {
            //Make put request
            const editedCard = await CardService.editCard(questionText, answerText, isknown, cardId);

            //Handle bad token
            if (!editedCard) {
                LoginService.logout();
                setUser(null);
                navigate('/login');
            }

            //Update frontend state
            setCards(() => cards.map((c) => {
                if (c.id === cardId) return editedCard as ICard;
                return c;
            }));
        }
        
        editCard();
        setEditHidden(true);
    }

    return (

    <div className="fixed inset-0 flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
            
            <div className="relative rounded-lg shadow border-2 border-gray-600 bg-gray-700">
                
                <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
                    <h3 className="text-xl font-semibold text-white">
                        Edit Card
                    </h3>
                    <button onClick={() => setEditHidden(true)} type="button" className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white" data-modal-hide="defaultModal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                            
                    <label className="block mb-2 text-sm font-medium text-white">Question</label>
                    <textarea onChange={(event) => {setQuestionText(event.target.value)}} className="block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" value={questionText}></textarea>

                    <label className="block mb-2 text-sm font-medium text-white">Answer</label>
                    <textarea onChange={(event) => {setAnswerText(event.target.value)}} className="block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" value={answerText}></textarea>
                            
                </div>
                
                <div className="flex items-center p-6 space-x-2 border-t rounded-b border-gray-600">
                    <Button displayTag={"Save"} clickHandler={() => onSave()} />
                    <button onClick={() => setEditHidden(true)} type="button" className="focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">Cancel</button>
                </div>
        

            </div>
        </div>
    </div>

        );
};