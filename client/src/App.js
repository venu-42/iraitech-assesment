import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
