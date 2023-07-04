import "../App.css"
import { useEffect, useState } from "react"
import Table from "../components/table"
import axios from "axios";


interface Card {
    id : number;
    question : string;
    answer : string;
    isKnown : boolean;
}

export default function Decks(){
    const [cards, setCards] = useState<Card[]>([])

    //Fetch data from server on refresh
    useEffect(() => {
        axios.get("http://localhost:3001/notes")
        .then(Response => {
            setCards(cards.concat(Response.data as Card[]))
            });
    }, [])

    return(
        <div className="w-full h-screen flex justify-center bg-gray-900">
            <div className="w-10/12 my-9 overflow-y-auto">
                <Table cards={cards}/>
            </div>

        </div>



        
)};