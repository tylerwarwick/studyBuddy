import '../App.css'
import { AltPlusIcon } from '../icons/altPlusIcon'

interface props {
    deckId: string
}

export default function NewCardPlaceholder({deckId: deckId} : props){
    

    return(
        <div className="relative">
            <a href={`/edit-deck/${deckId}`}>
                <div className='flex justify-center flex-col block w-11/12 h-56 sm:w-96 md:h-64 flex items-center justify-center p-16 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700 space-y-4'>
                    <AltPlusIcon />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white text-center select-none">
                        This deck doesn't have any cards yet. Click here to add some.
                    </h5>
                </div>
            </a>
        </div>
            
        
    )
}