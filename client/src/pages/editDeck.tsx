import "../App.css"
import { useContext, useEffect, useState } from "react"
import Table from "../components/table"
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/button";
import { PlusIcon } from "../icons/plusIcon";
import EditModal from "../components/editModal";
import { NewCardModal } from "../components/newCardModal";
import { ICard } from "../types/card";
import CardService from "../services/cardService";
import { UserContext } from "../services/userContext";
import LoginService from "../services/loginService";
import ConfirmDeletePopup from "../components/confirmDeletePopup";

//Declare context types and states to share all states necessary
type ContextType = {
    setEditHidden: React.Dispatch<React.SetStateAction<boolean>>;
    cards : ICard[];
    setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
    setID : React.Dispatch<React.SetStateAction<string>>;
    questionText : string
    setQuestionText: React.Dispatch<React.SetStateAction<string>>;
    answerText : string
    setAnswerText: React.Dispatch<React.SetStateAction<string>>;
  };

const ContextState = {
   setEditHidden: () => {},
   cards : [],
   setCards: () => {},
   setID: () => {},
   questionText : "",
   setQuestionText : () => {},
   answerText : "",
   setAnswerText : () => {}
}

const Context = React.createContext<ContextType>(ContextState)
export { Context }



type deckID = {a : string}

export default function EditDeck(){
    const [cards, setCards] = useState<ICard[]>([]);

    //Need to set edit modal properties from top component
    //As well as nested rows
    const [editModalHidden, setEditHidden] = useState(true);
    const [questionText, setQuestionText] = useState('');
    const [answerText, setAnswerText] = useState('');
    const [modalCardID, setID] = useState('');

    //Hide new card modal as well
    const [newModalHidden, setNewHidden] = useState(true);
    
    //Need to share deckId for all backend calls
    const { deckId } = useParams<string>();

    //Also need state to manage confirm delete popup
    const [confirmHidden, setConfirmHidden] = useState(true);

    //Need to update auth and logout on token expire
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    //Fetch data from server on refresh
    useEffect(() => {
        const getData = async () => {
            //Get param from router and hand to api to return cards
            const data = await CardService.getCards(deckId!);

            //Handle bad token
            if (!data) {
                LoginService.logout();
                setUser(null);
                navigate('/login');
            }
            //Set state
            setCards(data as ICard[]);
        }
    
        getData();

        
    }, [])

    
    //Pass to new card modal to create cards
    const newCard = async (question: string, answer: string) => {
        //Post to backend
        const data = await CardService.newCard(question, answer, deckId!);
 
        //Handle bad token
        if (!data) {
            LoginService.logout();
            setUser(null);
            navigate('/login');
        }
            
        //Update state
        setCards((cards) => cards.concat(data as ICard))
    }

    //Don't want to prop drill modal content down multiple layers so I will pass as context
    //May be over kill but likely a more readable solution
    return(
        <Context.Provider value={{setEditHidden, cards, setCards, setID, questionText, setQuestionText, answerText, setAnswerText}}>
                    <div className="bg-gray-900 w-full h-screen">
                        <div className="flex flex-col items-center my-4 space-y-2">

                            <div className="w-10/12 space-y-2">
                                <button onClick={() => setConfirmHidden(false)} className='text-white focus:ring-4 w-full focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>Delete Deck</button>
                                <Table />

                                { (cards.length === 0) ?
                                    (
                                        <div className="bg-gray-800 border-gray-700 rounded-lg block h-full flex justify-center items-center text-center px-10 py-28 my-4">
                                            <h1 className="text-bold text-gray-400 text-lg">
                                                This deck has no questions yet. Click the plus button to add some.
                                            </h1>
                                        </div>
                                    )
                                    :
                                    (
                                        <div>

                                        </div>
                                    )
                                }






                            </div>

                            {editModalHidden ? null : (<EditModal cardId={modalCardID}/>)}
                            {confirmHidden ? null : (<ConfirmDeletePopup setConfirmHidden={setConfirmHidden} deckId={deckId!} />)}

                            {newModalHidden ? null : (
                                <NewCardModal 
                                setHidden={setNewHidden}
                                newCard={newCard}
                                />
                            )}   

                        </div>

                        <div className="absolute right-12 bottom-24 ">
                            <button onClick={() => setNewHidden(false)} className="text-white flex justify-center items-center text-5xl font-bold w-24 h-24 rounded-full focus:ring-4 focus:outline-none focus:ring-blue-300 py-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                                <PlusIcon/>
                            </button>     
                        </div>
                    </div>
        </Context.Provider>

        
)};