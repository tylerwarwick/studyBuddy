import '../App.css'




export default function NewDeck(){
    return(
        <div className="relative">
        <a href="">
        <div className="max-w-sm w-96 h-64 px-6 border rounded-lg shadow bg-gray-800 border-gray-700">
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center">
                <h1 className='text-center bg-inherit text-5xl font-bold text-white'>ADD NEW DECK
                </h1>
            </div>
            <div className="absolute space-x-3 bottom-12 left-1/2 transform -translate-x-1/2">
                
            </div>
        </div>
        </a>
    </div>
    )
}