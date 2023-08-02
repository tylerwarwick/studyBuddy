import '../App.css'
import CardRender from '../components/cardRender'
import Jumbotron from '../components/jumbotron'
import Table from '../components/table'

export default function Lobby() {
    return (
        <div className='height-fit grid grid-col-1 bg-gray-900'>
            <div className='min-h-screen flex items-center justify-center grid font-bold motion-safe:animate-fadeIn animate-bounce'>
                <Jumbotron />
            </div>
            <div className='min-h-screen max-w-screen flex justify-center font-bold'>
                <div className='grid grid-cols-2 gap-8'>
                    <div className='text-3xl font-bold text-white'>
                        asfasfasdfasdfadsf
                    </div>
                    <div className='text-3xl font-bold text-black'>
                        sdafasdfadsfdasfasdfdsf
                    </div>
                </div>
                
            </div>
        </div>
    )
}