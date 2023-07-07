import "../App.css"
import { MouseEvent, useEffect, useState } from "react"
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


    const toggleIsKnown = (event : React.MouseEvent<HTMLTableCellElement>, card : Card) => {
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



    return(
        <div className="w-full h-screen flex justify-center bg-gray-900">
            <div className="w-10/12 my-9 overflow-y-auto">
                <Table cards={cards} func={toggleIsKnown} />
            </div>

        </div>



        
)};