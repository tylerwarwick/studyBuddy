import { MouseEvent } from "react";
import "../App.css"

interface Card {
    id : number;
    question : string;
    answer : string;
    isKnown : boolean;
}

interface RowProps {
    card : Card
    clickHandler : (event : React.MouseEvent<HTMLTableCellElement>, card : Card) => void;
}

interface TableProps {
    cards : Card[];
    func : (event : React.MouseEvent<HTMLTableCellElement>, card : Card) => void;

}

const RowStyled = ({card, clickHandler} : RowProps) => {

    //hover:bg-gray-600
    return (
        <tr className="border-b bg-gray-800 border-gray-700">
        <td className="w-4 p-4">
            <div className="flex items-center">
                <input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                <label  className="sr-only">checkbox</label>
            </div>
        </td>
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-2/5 dark:text-white ">
            {card.question}
        </th>
        <td className="px-6 py-4 w-2/5">
            {card.answer}
        </td>
        
        <td onClick={(event) => clickHandler(event, card)} className={(card.isKnown ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600") + " px-6 py-4"}>
            
        </td>

        <td className="px-6 py-4">
            <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        </td>
    </tr>

)};


const Table = ({ cards, func } : TableProps) => {
   

    return (
        <div className="relative overflow-y-scroll overflow-x-autoshadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700 text-gray-400 ">
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
                {cards.map((c) => (
                    <RowStyled 
                        card={c}
                        clickHandler={func}
                    />             
                    ))}

            </tbody>
        </table>
    </div>

)};

export default Table;