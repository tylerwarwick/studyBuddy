import axios from 'axios'
import '../App.css'
import { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import LoginService from '../services/loginService';
import { UserContext } from '../services/userContext';

interface props {
    setUsernameAlert: React.Dispatch<React.SetStateAction<boolean>>;
    setPasswordAlert: React.Dispatch<React.SetStateAction<boolean>>;
    setUniqueUserAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

// Registrationform
export default function RegistrationForm({setUsernameAlert: setUsernameAlert, setPasswordAlert: setPasswordAlert, setUniqueUserAlert: setUniqueUserAlert} : props) {
    const [un, setUn] = useState('');
    const [confirmUn, setConfirmUn] = useState('');
    const [pw, setPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUsernameAlert(() => false);
        setUsernameAlert(() => false)


        if (un === confirmUn && pw === confirmPw){
            const newUser = async () => {
                try{
                    const registration = await axios.post('http://localhost:3001/register', {username : un, password : pw});

                    if (registration){
                        //Need to update with login auth token
                        const response = await LoginService.login(un, pw);
                        if(response.data.token){
                            setUser(response.data);
                            window.localStorage.setItem('user', JSON.stringify(response.data))
                            navigate('/decks')
                        }
                    }
                    
                }

                catch (err){
                    setUniqueUserAlert(() => true)
                }
            }

            newUser();
        }

        else {
            if (un !== confirmUn) setUsernameAlert(() => true)
            if (pw !== confirmPw) setPasswordAlert(() => true)
        }
    }

    return (
        
  <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" action="#" onSubmit={(event) => handleSubmit(event)}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create account</h5>
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input onChange={(event) => {setUn(event.target.value)}} type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Username" required />
          </div>
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm username</label>
              <input onChange={(event) => {setConfirmUn(event.target.value)}} type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Username" required />
          </div>
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input onChange={(event) => {setPw(event.target.value)}} type="password" name="password" id="password" placeholder="••••••••••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input onChange={(event) => {setConfirmPw(event.target.value)}} type="password" name="password" id="password" placeholder="••••••••••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          
          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create your new account</button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already a member? <a href="/login" className="text-blue-700 hover:underline dark:text-blue-500">Sign in</a>
          </div>
      </form>
  </div>
  
    )
  }