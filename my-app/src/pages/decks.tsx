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
    setHidden: React.Dispatch<React.SetStateAction<boolean>>;
    cards : Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
    setID : React.Dispatch<React.SetStateAction<number>>;
    questionText : string
    setQuestionText: React.Dispatch<React.SetStateAction<string>>;
    answerText : string
    setAnswerText: React.Dispatch<React.SetStateAction<string>>;
  };

const ContextState = {
   setHidden: () => {},
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







export default function Decks(){
    const [cards, setCards] = useState<Card[]>([]);
    const [modalHidden, setHidden] = useState(true);
    const [modalCardID, setID] = useState(0);
    const [questionText, setQuestionText] = useState("");
    const [answerText, setAnswerText] = useState("");

    

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


    const updateCard = () => {
        //********** UPDATE BACKEND *************

        //Update frontend state
        const updateOnChange = cards.map((c) => {
            if (c.id === modalCardID) return {...c, question : questionText, answer : answerText}

            return c;
        })

        setCards(updateOnChange)
    }

    const fetchQuestionEdit = (question : string) => {
        setQuestionText(question)
    }

    const fetchAnswerEdit = (answer : string) => {
        setAnswerText(answer)
    }

    return(
        <Context.Provider value={{ setHidden, cards, setCards, setID, questionText, setQuestionText, answerText, setAnswerText }}>
                    <div>
                        <div className="w-full h-screen flex justify-center bg-gray-900">
                            <div className="w-10/12 my-9 overflow-y-auto">
                                <Table cards={cards} />
                            </div>
                            <div className={modalHidden ? "hidden" : ""}>
                                <Modal question={questionText} answer={answerText}
                                updateCard={updateCard} modalMode={modalMode}
                                setQuestion={fetchQuestionEdit} setAnswer={fetchAnswerEdit}/>
                            </div>
                        </div>
                    </div>
        </Context.Provider>

        
)};