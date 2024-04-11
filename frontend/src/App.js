import './css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout'
import Home from './pages/Home';
import Collection from './pages/Collection';
import Users from './pages/Users';
import VideoGame from './pages/VideoGame';
import Search from './pages/Search';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


function App() {
  // localStorage.clear();
  return (
    <BrowserRouter>
      <Routes>
      <Route index path='/login' element={<Login />} >

      </Route>
      <Route index path='/signup' element={<SignUp />} >

      </Route>
        <Route path='/' element={<Layout />}>
          <Route element={<Home />}></Route>
          <Route path='/collection/:collectionId' element={<Collection />}></Route>
          <Route path='/videoGame/:videoGameId' element={<VideoGame />}></Route>
          <Route path='/users' element={<Users />}></Route>
          <Route path='/search' element={<Search />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
