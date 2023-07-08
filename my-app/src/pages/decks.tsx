import "../App.css"
import { MouseEvent, useEffect, useState } from "react"
import Table from "../components/table"
import Modal from "../components/modal";
import axios from "axios";


export interface Card {
    id : number;
    question : string;
    answer : string;
    isKnown : boolean;
}

const dummyCard = {id : 100000000000, question : "Sample", answer : "Sample", isKnown : false}


export default function Decks(){
    const [cards, setCards] = useState<Card[]>([]);
    const [modalHidden, setHidden] = useState(true);
    const [modalCard, selectCard] = useState(dummyCard);

    //Fetch data from server on refresh
    useEffect(() => {
        axios.get("http://localhost:3001/notes")
        .then(Response => {
            setCards(cards.concat(Response.data as Card[]))
            });
    }, [])



    const toggleIsKnown = (card : Card) => {
        //Update backend
        //const url = 'http://localhost/3001/notes/{' + card.id + '}';
        //const change = !(card.isKnown);
        //axios.patch(url, {isKnown : change})

        //Update frontend state
        const updateKnown = cards.map((c) => {
            if (c.id === card.id) return {...c, isKnown : !(c.isKnown)}

            return c;
        })

        setCards(updateKnown)
    }

    const fetchCard = (card : Card) => {
        selectCard(() => card)
    }

    const modalMode = (bool : boolean) => {
        setHidden(() => bool)
    }

    return(
        <div>
            <div className="w-full h-screen flex justify-center bg-gray-900">
                <div className="w-10/12 my-9 overflow-y-auto">
                    <Table cards={cards} 
                    toggleIsKnown={toggleIsKnown} 
                    setModalHidden={modalMode} 
                    fetchCard={fetchCard}/>
                </div>
                <div className={modalHidden ? "hidden" : ""}>
                    <Modal card={modalCard} updateCard={() => {}} modalMode={modalMode} />
                </div>
            </div>
        </div>


        
)};