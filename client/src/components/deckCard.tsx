import "../App.css"

interface props {
    displayText : string
}

export default function DeckCard({displayText : deckName} : props) {
    return (
        <div className="relative">
            <div className="max-w-sm w-96 h-64 px-6 border rounded-lg shadow bg-gray-800 border-gray-700">
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center">
                    <h5 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">{deckName}</h5>
                </div>
                <div className="absolute space-x-3 bottom-12 left-1/2 transform -translate-x-1/2">
                    <a href="#" className="inline-flex items-center px-7 py-4 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                        Edit
                    </a>
                    <a href="#" className="inline-flex items-center px-4 py-4 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                        Practice
                    </a>
                </div>
            </div>
        </div>
    )
}