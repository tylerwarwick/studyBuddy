import "../App.css"
import LoginForm from "../components/loginForm"

export default function Login(){
    return (
        <div className="bg-white dark:bg-gray-900 h-screen flex items-center justify-center">
            <LoginForm/>
        </div>
        
    )
}