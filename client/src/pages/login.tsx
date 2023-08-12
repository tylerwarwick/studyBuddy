import { useState } from "react"
import "../App.css"
import LoginForm from "../components/loginForm"
import Alert from "../components/alert";

export default function Login(){
    const [alert, setAlert] = useState(false);


    return (
        <div className="bg-gray-900 h-screen flex items-center justify-center flex-col space-y-2">
            {alert ? <Alert dismissAlert={setAlert} message='Username and/or password are incorrect!'/> : null }
            <LoginForm setAlert={setAlert}/>
        </div>

    )
}