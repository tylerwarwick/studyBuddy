import React from 'react';
import './App.css';


interface ButtonProps{
  displayTag : string;
}

interface FormProps{
  actionLocation : string;
}

//Form
const Form = ({actionLocation} : FormProps) => {
  return (
  <form>
    <div className='p-3 m-0'>
      <label className='p-3 font-bold'>Email</label>
      <input type="email" placeholder='youremail@hotdog.com' name="email" className='border-2 border-blue-500 font-bold rounded'/>
    </div>
    <br></br>
    <div className='mx-3 m-0'>
      <label className='p-3 font-bold'>Password</label>
      <input type="password" placeholder='example password' name="password" className='border-2 border-blue-500 rounded'/>
    </div>
  </form>
  )
}



// Login form
function LoginForm() {
  return (
      <div className='box-border w-1/2 h-1/2 p-4 border-4'>
        <div>
          <Form actionLocation='pig'/>
          <Button displayTag='Click me'/> 
        </div>
      </div>
  )
}

const Button = ({displayTag} : ButtonProps) => {
  return (
  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>{displayTag}</button>
  )
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>

    <div className='h-screen flex justify-center items-center'>
      <LoginForm/>
    </div>


    </div>
  );
}

export default App;
