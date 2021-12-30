import 'normalize.css';
import './App.css';
import { useState, useEffect } from 'react';
import NavBar from './components/navbar';
import Login from './components/login';
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

  const sendErrorToast = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedInUser = await loginService.login({ username, password });
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
      window.localStorage.setItem('youBlogUser', JSON.stringify(loggedInUser));
      setPassword('');
      setUsername('');
    } catch (exception) {
      sendErrorToast('Error: Invalid username / password.');
    }
  };

  useEffect(() => {
    const persistedUser = window.localStorage.getItem('youBlogUser');
    if (persistedUser) {
      const existingUser = JSON.parse(persistedUser);
      setUser(existingUser);
      blogService.setToken(existingUser.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      blogService
        .getBlogs()
        .then((existingBlogs) => {
          setBlogs(existingBlogs);
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
      await userService.createUser(userInfo);
      const loggedInUser = await loginService.login({ username, password });

      setUser(loggedInUser);
      blogService.setToken(user.token);
      window.localStorage.setItem('youBlogUser', JSON.stringify(user));

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
    try {
      const updatedBlog = await blogService.updateBlog(blog);
      const allBlogs = blogs.map((b) => (b.id === updateBlog.id ? updatedBlog : b));
      setBlogs(allBlogs);
    } catch (exception) {
      sendErrorToast('An error occurred when sending like / dislike');
    }
  };

  const deleteBlog = async (blogToDelete) => {
    try {
      await blogService.deleteBlog(blogToDelete);
      const allBlogs = blogs.filter((blog) => blog.id !== blogToDelete.id);
      setBlogs(allBlogs);
    } catch (exception) {
      sendErrorToast('Unable to delete blog');
    }
  };

  return (
    <>
      <NavBar user={user} setIsLogin={setIsLogin} handleLogout={handleLogout} />
      {errorMessage && <Notification message={errorMessage} type="error" />}
      {!user && (
        <Login
          login={isLogin}
          updateUsername={setUsername}
          updatePassword={setPassword}
          updateName={setName}
          handleSubmit={isLogin ? handleLogin : handleSignUp}
        />
      )}
      {user && <BlogView blogs={blogs} addBlog={addBlog} updateBlog={updateBlog} deleteBlog={deleteBlog} />}
    </>
  );
}

export default App;
