import React from 'react';
import './App.css';
import Swiper from "./components/Swiper";
import {sliders} from "./utils/config";

function App() {
  return (
    <div className="App">
      <Swiper slides={sliders}/>
    </div>
  );
}

export default App;
