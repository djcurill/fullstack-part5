import 'normalize.css';
import './App.css';
import NavBar from './components/navbar';
import Login from './components/login';
import { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blog';
import userService from './services/user';
import BlogView from './views/blogs';
import Notification from './components/toast';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const sendErrorToast = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem('youBlogUser', JSON.stringify(user));
      setPassword('');
      setUsername('');
    } catch (exception) {
      sendErrorToast('Error: Invalid username / password.');
    }
  };

  useEffect(() => {
    const persistedUser = window.localStorage.getItem('youBlogUser');
    if (persistedUser) {
      const user = JSON.parse(persistedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      blogService
        .getBlogs()
        .then((blogs) => {
          setBlogs(blogs);
        })
        .catch((err) => {
          sendErrorToast('Service Unavailable: unable to retrieve blogs');
        });
    }
  }, [user]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const userInfo = { username, name, password };
      const newUser = await userService.createUser(userInfo);
      setUser(newUser);
      blogService.setToken(newUser.token);
      setPassword('');
      setUsername('');
      setName('');
    } catch (exception) {
      sendErrorToast(exception.name);
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem('youBlogUser');
  };

  const addBlog = async (blog) => {
    const returnedBlog = await blogService.createBlog(blog);
    const allBlogs = blogs.concat(returnedBlog);
    setBlogs(allBlogs);
  };

  const updateBlog = async (blog) => {
    const updatedBlog = await blogService.updateBlog(blog);
    const allBlogs = blogs.map((b) => {
      return b.id === updateBlog.id ? updatedBlog : b;
    });
    setBlogs(allBlogs);
  };

  return (
    <>
      <NavBar
        user={user}
        setIsLogin={setIsLogin}
        handleLogout={handleLogout}
      ></NavBar>
      {errorMessage && (
        <Notification message={errorMessage} type="error"></Notification>
      )}
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
        <BlogView
          blogs={blogs}
          addBlog={addBlog}
          updateBlog={updateBlog}
        ></BlogView>
      )}
    </>
  );
}

export default App;
