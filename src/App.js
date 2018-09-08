import React, { Component } from 'react';
import './App.css';

import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import Navigation from './components/Nav/Navegation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';


import 'tachyons';
const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">

         <Particles className='particles'
          params={particlesOptions} />
        <Navigation />
         <Logo />
         <Rank />
       <ImageLinkForm />
       {/*  <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
  