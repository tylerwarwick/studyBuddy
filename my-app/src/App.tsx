import React from 'react';
import './App.css';


interface ButtonProps{
  displayTag : string;
}

// Login form
function LoginForm() {
  return (
      <div className="h-screen flex items-center justify-center">
          <Button displayTag={"Click me"}/>
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

    <div>
    <LoginForm/>
    </div>


    </div>
  );
}

export default App;
