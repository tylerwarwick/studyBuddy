import './App.css';
import { LoginForm } from './components';
import { Button } from './components';
import { QuestionCard } from './components';
import { Navbar } from './components';

export function LoginPage() {
  return (
    <div className="dark:bg-gray-900">
      <div className='sticky top-0 w-full'>
        <Navbar />
      </div>
      <div className='h-screen flex justify-center items-center'>
        <LoginForm/>
      </div>
    </div>
  );
}
