import { useNavigate } from 'react-router-dom';
import '../App.css';
import DeckService from '../services/deckService';
import LoginService from '../services/loginService';
import { useContext } from 'react';
import { UserContext } from '../services/userContext';


interface props {
    setConfirmHidden: React.Dispatch<React.SetStateAction<boolean>>;
    deckId: string;
}

export default function ConfirmDeletePopup({setConfirmHidden: setConfirmHidden, deckId: deckId} : props){
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();



    const deleteDeck = async () => {
        //Post to backend
        const data = await DeckService.deleteDeck(deckId);
 
        //Handle bad token
        if (!data) {
            LoginService.logout();
            setUser(null);
            navigate('/login');
        }

        navigate('/decks');
    }


    return(
        <div id="deleteModal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed flex justify-center items-center z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center rounded-lg shadow bg-gray-800 sm:p-5 border-2 border-gray-600">
                <button onClick={() => setConfirmHidden(true)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white" data-modal-toggle="deleteModal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <svg className="text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                <p className="mb-4 text-gray-300">Are you sure you want to delete this deck?</p>
                <div className="flex justify-center items-center space-x-4">
                    <button onClick={() => setConfirmHidden(true)} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium rounded-lg border focus:ring-4 focus:outline-none focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">
                        No, cancel
                    </button>
                    <button onClick={() => deleteDeck()} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-red-500 hover:bg-red-600 focus:ring-red-900">
                        Yes, I'm sure
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}