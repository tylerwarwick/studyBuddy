import axios from 'axios'
import '../App.css'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import LoginService from '../services/loginService';

// Registrationform
export default function RegistrationForm() {
    const [un, setUn] = useState('');
    const [confirmUn, setConfirmUn] = useState('');
    const [pw, setPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (un === confirmUn && pw === confirmPw){
            const newUser = async () => {
                try{
                    await axios.post('http://localhost:3001/new-user', {username : un, password : pw});
                    await LoginService.login(un, pw);
                    navigate('/decks')

                    //Need to update with login auth token
                }

                catch (err){
                    alert("Username is already under use")
                }
            }

            newUser();
        }

        else {
            if (un !== confirmUn) alert("Usernames must match!");
            if (pw !== confirmPw) alert("Passwords must match!");
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