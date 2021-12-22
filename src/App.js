import 'normalize.css';
import './App.css';
import NavBar from './components/navbar';
import Login from './components/login';
import { useState } from 'react';
import loginService from './services/login';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  let isLogin = true;

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setPassword('');
      setUsername('');
    } catch (exception) {
      console.error(exception);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <Login
        login={isLogin}
        updateUsername={setUsername}
        updatePassword={setPassword}
        handleSubmit={handleLogin}
      ></Login>
    </>
  );
}

export default App;
