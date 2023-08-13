import { useContext } from "react";
import "../App.css"
import { Context } from "../pages/editDeck";
import { ICard } from "../types/card";
import CardService from "../services/cardService";
import LoginService from "../services/loginService";
import { UserContext } from "../services/userContext";
import { useNavigate } from "react-router-dom";



interface RowProps {
    card : ICard
}

const RowStyled = ({ card } : RowProps) => {
    const { setEditHidden, cards, setCards, setID, setQuestionText,  setAnswerText} = useContext(Context);
    
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const toggleIsKnown = (card : ICard) => {
        const updateCard = async () => {
            //Send put request
            const updatedCard = await CardService.editCard(card.question, card.answer, !card.isKnown, card.id)

            //Handle bad token
            if (!updatedCard) {
                LoginService.logout();
                setUser(null);
                navigate('/login');
            }

            //Update frontend state
            const updateKnown = cards.map((c) => {
                if (c.id === card.id) return {...c, isKnown : !(c.isKnown)}

                return c;
            })

            setCards(updateKnown)
        }

        updateCard();
        
    }

    
    const onEdit = () => {
        setID(() => card.id);
        setQuestionText(() => card.question);
        setAnswerText(() => card.answer);
        setEditHidden(false);
    }

    const onDelete = () => {
        //Update backend
        const deleteCard = async () => {
            const data = await CardService.deleteCard(card.id)

            //Handle bad token
            if (!data) {
                LoginService.logout();
                setUser(null);
                navigate('/login');
            }
        }

        deleteCard();

        //Update frontend state
        const updateKnown = cards.filter((c) => {return c.id != card.id});
        setCards(updateKnown)
    }
    

    return (
        <tr className="border-b bg-gray-800 border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-2/5 dark:text-white ">
            {card.question}
        </th>
        <td className="px-6 py-4 w-2/5">
            {card.answer}
        </td>
        
        <td onClick={() => toggleIsKnown(card)} className={(card.isKnown ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600") + " px-6 py-4"}>
            
        </td>

        <td className="px-6 py-4 space-x-3">
            <a onClick={() => onEdit()} className="font-medium text-blue-600 dark:text-blue-500 select-none hover:underline">Edit</a> 
            <a onClick={() => onDelete()} className="font-medium text-blue-600 dark:text-blue-500 select-none hover:underline">Delete</a>
        </td>
    </tr>

)};


const Table = () => {
    const {cards} = useContext(Context);
    
    return (
        <div className="relative overflow-y-scroll overflow-x-autoshadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700 text-gray-400 ">
                <tr>
                    
                    <th scope="col" className="px-6 py-3">
                        Question
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Answer
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Rating
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="h-5/6">
                {cards.map((c) => (
                    <RowStyled card={c} />             
                    ))}

            </tbody>
        </table>

    
    </div>

)};

export default Table;