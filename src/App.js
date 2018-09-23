import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';

import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import Navigation from './components/Nav/Navegation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
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



// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: 'edac300f4aad40bf836053c10a8aba46'
});

class App extends Component {
  constructor(){
    super();
      this.state = {
        input: '',
        imageURL:'',
      }
    }

    onInputChange = (event) => {
      this.setState({input: event.target.value})
    }

    onButtonSubmit = () =>{
      this.setState({imageURL: this.state.input})
      app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
         this.state.input)
         .then(
            function(response) {
             console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
            },
            function(err) {
              // there was an error
            }
  );
    }
  render() {
    return (
      <div className="App">

         <Particles className='particles'
          params={particlesOptions} />
         <Navigation />
         <Logo />
         <Rank />
         <ImageLinkForm
          onInputChange = {this.onInputChange}
          onButtonSubmit = {this.onButtonSubmit}/>
         <FaceRecognition imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
  