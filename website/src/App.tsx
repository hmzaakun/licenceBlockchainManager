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
import { MoonPayProvider } from '@moonpay/moonpay-react';
import TestProxy from './components/testProxy/testProxy';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

function App() {
  const color = useMotionValue(COLORS_TOP[0]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <MoonPayProvider
      apiKey="pk_test_72JAXbpZVcQgD2XlwwHFSnhMVcqGTEB"
      debug
    >
      <motion.section
        style={{
          backgroundImage,
        }}
        className="bg-gray-950"
      >
        <Header />
        <div className='h-screen overflow-scroll'>
          <Routes>
            <Route path="/" element={<Home color={color} />} />
            <Route path="/Licences" element={<Licences />} />
            <Route path='/Licence/:id' element={<Licence />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/Proxy" element={<TestProxy />} />
          </Routes>
        </div>
      </motion.section>
    </MoonPayProvider>
  );
}

export default App;