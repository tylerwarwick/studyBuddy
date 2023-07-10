import "../App.css"
import { MouseEvent, useContext, useEffect, useState } from "react"
import Table from "../components/table"
import Modal from "../components/modal";
import axios from "axios";
import React from "react";

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
    modalHidden: boolean;
    setHidden: React.Dispatch<React.SetStateAction<boolean>>;
    cards : Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
    modalCardID : number;
    setID : React.Dispatch<React.SetStateAction<number>>;
  };

const ContextState = {
   modalHidden: true,
   setHidden: () => {},
   cards : [],
   setCards: () => {},
   modalCardID : 0,
   setID: () => {}
}
const Context = React.createContext<ContextType>(ContextState)
export { Context }







export default function Decks(){
    const [cards, setCards] = useState<Card[]>([]);
    const [modalHidden, setHidden] = useState(true);
    const [modalCardID, setID] = useState(0);
    const [questionText, setQuestionText] = useState("");
    const [answerText, setAnswerText] = useState("");

    const onSave = () => {
        // ******* UPDATE BACKEND HERE *******


        //Update frontend
        updateCard(modalCardID, questionText, answerText)
        setHidden(true)
    }
    

    //Fetch data from server on refresh
    useEffect(() => {
        axios.get("http://localhost:3001/notes")
        .then(Response => {
            setCards(cards.concat(Response.data as Card[]))
            });
    }, [])


    
    const modalMode = (bool : boolean) => {
        setHidden(() => bool)
    }


    const updateCard = (id : number | undefined, question : string, answer : string) => {
        //********** UPDATE BACKEND *************

        //Update frontend state
        const updateOnChange = cards.map((c) => {
            if (c.id === id) return {...c, question : question, answer : answer}

            return c;
        })

        setCards(updateOnChange)
    }


    return(
        <Context.Provider value={{ modalHidden, setHidden, cards, setCards, modalCardID, setID }}>
                    <div>
                        <div className="w-full h-screen flex justify-center bg-gray-900">
                            <div className="w-10/12 my-9 overflow-y-auto">
                                <Table cards={cards} />
                            </div>
                            <div className={modalHidden ? "hidden" : ""}>
                                <Modal card={cards?.find((c) => c.id === modalCardID)} updateCard={updateCard} modalMode={modalMode} />
                            </div>
                        </div>
                    </div>
        </Context.Provider>

        
)};