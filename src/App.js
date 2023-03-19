import { Route, Routes } from 'react-router-dom';
import ErrorPage from './components/common/ErrorPage';
import Home from './view/home/Home';
import Profile from './view/home/Profile';
import Setting from './view/home/Setting';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <Routes>
        <Route exact path='/' element={<Home />} >
          <Route path='/profile' element={<Profile />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
