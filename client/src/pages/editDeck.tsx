import "../App.css"
import { useEffect, useState } from "react"
import Table from "../components/table"
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Button from "../components/button";
import { PlusIcon } from "../icons/plusIcon";
import EditModal from "../components/editModal";
import { NewCardModal } from "../components/newCardModal";

//Create card interface here and share with other components
//Might make sense to move this somewhere central in future
export interface Card {
    id : number;
    question : string;
    answer : string;
    isKnown : boolean;
}

//Declare context types and states to share all states necessary
type ContextType = {
    setEditHidden: React.Dispatch<React.SetStateAction<boolean>>;
    cards : Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
    setID : React.Dispatch<React.SetStateAction<number>>;
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
    const [cards, setCards] = useState<Card[]>([]);
    const [editModalHidden, setEditHidden] = useState(true);
    const [newModalHidden, setNewHidden] = useState(true);
    const [modalCardID, setID] = useState(0);
    const [questionText, setQuestionText] = useState("");
    const [answerText, setAnswerText] = useState("");

    const params = useParams<deckID>() as string;
    

    //Fetch data from server on refresh
    useEffect(() => {
        axios.get("http://localhost:3001/")
        .then(Response => {
            setCards(cards.concat(Response.data[Object.values(params)[0]] as Card[]))
            console.log(Response.data[Object.values(params)[0]])
            console.log(cards);
            });
    }, [])


    const updateCard = () => {
        //********** UPDATE BACKEND *************

        //Update frontend state
        const updateOnChange = cards.map((c) => {
            if (c.id === modalCardID) return {...c, question : questionText, answer : answerText}

            return c;
        })

        setCards(updateOnChange)
    }


    //<Button displayTag={""} clickHandler={() => {}} />
    /*
    <div className="w-10/12 space-y-2">
                                <button className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add New Card </button>
                                <Table cards={cards} />
                            </div>
    */

    return(
        <Context.Provider value={{ setEditHidden, cards, setCards, setID, questionText, setQuestionText, answerText, setAnswerText }}>
                    <div className="bg-gray-900 w-full h-screen">
                        <div className="flex flex-col items-center my-4 space-y-2">
                            <div className="w-10/12">
                                <Table cards={cards} />
                            </div>
                            <div className={editModalHidden ? "hidden" : ""}>
                                <EditModal question={questionText} answer={answerText}
                                updateCard={updateCard} setModalMode={setEditHidden}
                                setQuestionText={setQuestionText} setAnswerText={setAnswerText}/>
                            </div>
                            <div className={newModalHidden ? "hidden" : ""}>
                                <NewCardModal 
                                cards={cards} 
                                setCards={setCards}
                                setHidden={setNewHidden}
                                />
                            </div>
                        </div>

                        <div className="absolute right-12 bottom-24 ">
                            <button onClick={() => setNewHidden(false)} className="text-white flex justify-center items-center text-5xl font-bold w-24 h-24 rounded-full focus:ring-4 focus:outline-none focus:ring-blue-300 py-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                                <PlusIcon/>
                            </button>     
                        </div>
                    </div>
        </Context.Provider>

        
)};