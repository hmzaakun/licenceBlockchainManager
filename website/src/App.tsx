import './App.css';
import React from "react";
import {
  useMotionTemplate,
  useMotionValue,
  motion
} from "framer-motion";
import Header from './components/header/header';
import Home from './components/home/home';
import { Route, Routes } from 'react-router-dom';
import Licences from './components/licences/licences';
import Profile from './components/profile/profile';
import Create from './components/create/create';
import Licence from './components/licence/licence';
import Login from './components/connexion/login';
import Signup from './components/connexion/signup';
// import { createThirdwebClient } from "thirdweb";
// import { ThirdwebProvider, ConnectButton } from "thirdweb/react";

// const client = createThirdwebClient({
//   clientId: "4caaf9602b8d1fce2fc3d65905a6493b",
// });

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

function App() {
  const color = useMotionValue(COLORS_TOP[0]);

  const [showLogin, setShowLogin] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="bg-gray-950"
    >
      <Header setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
      <Login showLogin={showLogin} setShowLogin={setShowLogin} />
      <Signup showSignup={showSignup} setShowSignup={setShowSignup} />
      <div className='h-screen overflow-scroll'>
        <Routes>
          <Route path="/" element={<Home color={color} setShowSignup={setShowSignup} />} />
          <Route path="/Licences" element={<Licences />} />
          <Route path='/Licence/:id' element={<Licence />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Create" element={<Create />} />
        </Routes>
      </div>
    </motion.section>
  );
}

export default App;