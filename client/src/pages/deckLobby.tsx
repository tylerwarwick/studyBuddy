import { useContext, useEffect, useState } from "react";
import "../App.css"
import DeckCard from "../components/deckCard";
import NewDeck from "../components/newDeck";
import { IDeck } from "../types/deck";
import { UserContext } from "../services/userContext";
import { useNavigate } from "react-router-dom";
import DeckService from "../services/deckService";
import LoginService from "../services/loginService";
import DeckCard2 from "../components/deckCard";
import NewDeck2 from "../components/newDeck";






export default function DeckLobby() {
    const [decks, setDecks] = useState<IDeck[]>([]);
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getDecks = async () => {
            const returnedDecks = await DeckService.getDecks();

            if (returnedDecks === null) {
                LoginService.logout();
                setUser(null);
                navigate('/login');
            }
            setDecks(returnedDecks);
        }

        getDecks();
    }, []);


    return (
        
        <div className="min-h-screen h-full bg-gray-900 w-screen">
            <div className="flex w-full justify-center items-center py-10">
                <div className="flex flex-col w-11/12 lg:grid lg:grid-cols-3 lg:gap-10 space-y-6 lg:space-y-0 justify-content items-center overflow-none">
                    {decks?.map((deck) => (
                        <DeckCard deck={deck} decks={decks} setDecks={setDecks}/>             
                        ))}
                    <NewDeck decks={decks} setDecks={setDecks}/>
                </div>
            </div>  
        </div>
       
    );
}