import './App.css';
import Header from './components/header/header';
import Home from './components/home/home';
import { Route, Routes } from 'react-router-dom';
import Licences from './components/licences/licences';
import Profile from './components/profile/profile';

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Licences" element={<Licences />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
