import { useContext, useState } from 'react';
import '../App.css';
import LoginService from '../services/loginService';
import { UserContext } from '../services/userContext';
import { useNavigate } from 'react-router-dom';


interface props {
    setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}


// Login form
export default function LoginForm({setAlert: setAlert} : props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setAlert(() => false);

        const tryLogin = async () => {
            try {
                const response = await LoginService.login(username, password);
                if(response.data.token){
                    setUser(response.data);
                    window.localStorage.setItem('user', JSON.stringify(response.data))
                    navigate('/decks')
                }
            }   

            catch (error) {
                setAlert(() => true);
            }
        }

        tryLogin();
    }
    
    //If I want I can come back and add remeber me and forgot password
    /*
    <div className="flex items-start">
          <div className="flex items-start">
              <div className="flex items-center h-5">
                      <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                  </div>
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
              </div>
              <a href="#" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
          </div>
    */

    return (
        
  <div className="w-full max-w-sm p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-gray-800 border-gray-700">
      <form className="space-y-6" onSubmit={event => handleSubmit(event)}>
          <h5 className="text-xl font-medium text-white">Sign in</h5>
          <div>
              <label className="block mb-2 text-sm font-medium text-white">Username</label>
              <input onChange={event => setUsername(event.target.value)} type="username" name="username" id="username" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="username" required />
          </div>
          <div>
              <label className="block mb-2 text-sm font-medium text-white">Password</label>
              <input onChange={event => setPassword(event.target.value)} type="password" name="password" id="password" placeholder="••••••••••••••••" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required />
          </div>
          
          <button type="submit" className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Login to your account</button>
          <div className="text-sm font-medium text-gray-300">
              Not registered? <a href="/register" className="hover:underline text-blue-500">Create account</a>
          </div>
      </form>
  </div>
  
    )
  }