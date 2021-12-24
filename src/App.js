import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Block from './Components/Block/Block';
import Contect from './Components/Contect/Contect';
import Destination from './Components/Destination/Destination';
import Login from './Components/Login/Login'
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
export const UserContext = createContext();
function App() {
  const [data, setData] = useState({});
  const style1 = {
    textDecoration: "none",
    padding: "10px",
    margin: "10px",
    color: "tomato"
  };
  return (
    <div className='App'>
      <UserContext.Provider value={[data, setData]}>
        <span style={{ color: "black", marginRight: "500px", fontSize: "25px" }}>First Riders</span>
        <Link style={style1} to="/home">Home</Link>
        <Link style={style1} to="/block">Block</Link>
        <Link style={style1} to="/destination">Destination</Link>
        {
          data.email ? <Link style={style1} to="/login">{data.displayName}</Link> : <Link style={style1} to="/login">Login</Link>

        }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/block" element={<Block />} />
          <Route path="/contect" element={<Contect />} />
          <Route path="/destination/:name" element={
            <PrivateRoute>
              <Destination />
            </PrivateRoute>
          } />
          <Route path="/destination" element={
            <PrivateRoute>
              <Destination />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
