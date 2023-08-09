import { useContext, useEffect, useState } from "react";
import "../App.css"
import DeckCard from "../components/deckCard";
import axios from "axios";
import NewDeck from "../components/newDeck";
import { IDeck } from "../types/deck";
import baseUrl from "../api/baseUrl";
import { UserContext } from "../services/userContext";
import { useNavigate } from "react-router-dom";
import DeckService from "../services/deckService";
import deckService from "../services/deckService";






export default function DeckLobby() {
    const [decks, setDecks] = useState<IDeck[]>([]);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getDecks = async () => {
            const returnedDecks = await DeckService.getDecks();

            if (returnedDecks === null) navigate('/login');
            setDecks(returnedDecks);
        }

        getDecks();
    }, []);


    return (
        
        <div className="min-h-screen h-full bg-gray-900 w-screen ">
            <div className="flex justify-center items-center py-6">
                
                    <div className="grid [@media(min-width:1290px)]:grid-cols-3 gap-10 [@media(max-width:1289px)]:grid-cols-2 [@media(max-width:880px)]:grid-cols-1">
                        {decks?.map((deck) => (
                            <DeckCard deck={deck} decks={decks} setDecks={setDecks}/>             
                            ))}
                        <NewDeck decks={decks} setDecks={setDecks}/>
                    </div>
                
            </div>
            
        </div>
       
    );
}