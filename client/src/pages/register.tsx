import { useState } from 'react';
import '../App.css'
import Alert from '../components/alert';
import RegistrationForm from '../components/registrationForm'

export default function Register(){
    const [usernameAlert, setUsernameAlert] = useState(false);
    const [passwordAlert, setPasswordAlert] = useState(false);
    const [uniqueUserAlert, setUniqueUserAlert] = useState(false);

    return (

        <div className="bg-white dark:bg-gray-900 h-screen flex items-center justify-center flex-col space-y-2">
            {usernameAlert ? <Alert dismissAlert={setUsernameAlert} message='Usernames must match!'/> : null }
            {passwordAlert ? <Alert dismissAlert={setPasswordAlert} message='Passwords must match!'/> : null }
            {uniqueUserAlert ? <Alert dismissAlert={setUniqueUserAlert} message='Username is already taken!'/> : null }
            <RegistrationForm 
            setUsernameAlert={setUsernameAlert} 
            setPasswordAlert={setPasswordAlert}
            setUniqueUserAlert={setUniqueUserAlert}
            />
        </div>
            
        
        
    )
}