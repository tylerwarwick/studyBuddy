import "../App.css"


interface Card {
    id : number;
    question : string;
    answer : string;
    isKnown : boolean;
}

interface Cards {
    cards : Card[];
}

const RowStyled = (card: Card) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-4 p-4">
            <div className="flex items-center">
                <input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                <label  className="sr-only">checkbox</label>
            </div>
        </td>
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {card.question}
        </th>
        <td className="px-6 py-4">
            {card.answer}
        </td>
        <td className={(card.isKnown ? "bg-green-500" : "bg-red-500") + " px-6 py-4"}>
            
        </td>
        <td className="px-6 py-4">
            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        </td>
    </tr>

)};


const Table = ({ cards } : Cards) => {
   

    return (
        <div className="relative overflow-y-scroll overflow-x-autoshadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-700 text-gray-400 ">
                <tr>
                    <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600  rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"></input>
                            <label  className="sr-only">checkbox</label>
                        </div>
                    </th>
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
                        Action
                    </th>
                </tr>
            </thead>
            <tbody className="h-5/6">
                {cards.map(({id, question, answer, isKnown}) => (
                    <RowStyled 
                    id={id} 
                    question={question} 
                    answer={answer} 
                    isKnown={isKnown} 
                    />               
                    ))}

            </tbody>
        </table>
    </div>

)};

export default Table;