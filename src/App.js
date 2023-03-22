import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorPage from './components/common/ErrorPage';
import Login from './view/auth/Login';
import SignUp from './view/auth/SignUp';
import Home from './view/home/Home';
import Profile from './view/home/Profile';
import Setting from './view/home/Setting';
import PostGallery from './view/post/PostGallery';

function App() {
  return (
    <div className="App">
      <Toaster />
      {/* <Home /> */}
      <Routes>
        <Route exact path='/' element={<Home />} >
          <Route path='/' element={<Navigate to="/posts" />} />
          <Route path='/posts' element={<PostGallery />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
