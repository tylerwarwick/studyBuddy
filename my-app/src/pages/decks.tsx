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


// Declare all contexts for rows to interact with Modal
//Context to deal with opening and closing modal
type ModalContextType = {
    modalHidden: boolean;
    setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  };

const ModalContextState = {
   modalHidden: true,
   setHidden: () => {}
}
const ModalContext = React.createContext<ModalContextType>(ModalContextState)
export { ModalContext }

//Context to deal with toggling if the card is known already
type CardsContextType = {
    cards : Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  };

const CardsContextState = {
   cards : [],
   setCards: () => {}
}
const CardsContext = React.createContext<CardsContextType>(CardsContextState)
export { CardsContext }

const dummyCard = {id : 1000000, question : "question", answer : "answer", isKnown : false};

//Context to tell what card the modal should display/perform edits on

type ModalCardContextType = {
    modalCardID : number;
    setID : React.Dispatch<React.SetStateAction<number>>;
  };

const ModalCardContextState = {
   modalCardID : 0,
   setID: () => {}
}
const ModalCardContext = React.createContext<ModalCardContextType>(ModalCardContextState)
export { ModalCardContext }






export default function Decks(){
    const [cards, setCards] = useState<Card[]>([]);
    const [modalHidden, setHidden] = useState(true);
    const [modalCardID, setID] = useState(0);
    

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


    

    return(
        <ModalContext.Provider value={{ modalHidden, setHidden }}>
            <CardsContext.Provider value={{ cards, setCards }}>
                <ModalCardContext.Provider value={{ modalCardID, setID }}>
                    <div>
                        <div className="w-full h-screen flex justify-center bg-gray-900">
                            <div className="w-10/12 my-9 overflow-y-auto">
                                <Table cards={cards} />
                            </div>
                            <div className={modalHidden ? "hidden" : ""}>
                                <Modal card={cards?.find((c) => c.id === modalCardID)} updateCard={() => {}} modalMode={modalMode} />
                            </div>
                        </div>
                    </div>
                </ModalCardContext.Provider>
            </CardsContext.Provider>
        </ModalContext.Provider>

        
)};