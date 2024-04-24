import './App.css';
import React, { useEffect } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
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

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

function App() {
  const color = useMotionValue(COLORS_TOP[0]);

  const [showLogin, setShowLogin] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
    // eslint-disable-next-line
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

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
