import 'normalize.css';
import './App.css';
import NavBar from './components/navbar';
import Login from './components/login';
import { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blog';
import userService from './services/user';
import BlogView from './views/blogs';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  //const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log('running login');
      const user = await loginService.login({ username, password });
      setUser(user);
      setPassword('');
      setUsername('');
    } catch (exception) {
      console.error(exception);
    }
  };

  useEffect(() => {
    if (user) {
      blogService
        .getBlogs()
        .then((blogs) => {
          setBlogs(blogs);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      console.log('running sign up');
      const userInfo = { username, name, password };
      const newUser = await userService.createUser(userInfo);
      setUser({ username: newUser.username, name: newUser.name });
      setPassword('');
      setUsername('');
      setName('');
    } catch (exception) {
      console.error(exception);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <NavBar
        user={user}
        setIsLogin={setIsLogin}
        handleLogout={handleLogout}
      ></NavBar>
      {!user && (
        <Login
          login={isLogin}
          updateUsername={setUsername}
          updatePassword={setPassword}
          updateName={setName}
          handleSubmit={isLogin ? handleLogin : handleSignUp}
        ></Login>
      )}
      {user && (
        <BlogView blogs={blogs} user={user} setBlogs={setBlogs}></BlogView>
      )}
    </>
  );
}

export default App;
