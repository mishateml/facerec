import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';

import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/SingIn';
import Register from './components/Register/Register';
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
        box:{},
        route: 'signin',
        isSignedIn: false,
        user: {
            id: '123',
            name: 'misha',
            email: '',
            entries: 0,
            joined: ''
        }
      }
    }

    loadUser = (data) => {
      this.setState( {user: {
        id: data.id,
        name: data.name,
        email: data.email,
        enties: 0,
        joined: data.joined
      }})
    }



    calcFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height =Number(image.height);
      return{
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
   }

   displayFaceBox = (box) => {
     console.log(box);
     this.setState({box: box})
   }

    onInputChange = (event) => {
      this.setState({input: event.target.value})
    }

    onButtonSubmit = () =>{
      this.setState({imageURL: this.state.input})
      app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
         this.state.input)
         .then((response) => {
          if (response){
            fetch('http://localhost:3001/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count}))
              })
          } 
          this.displayFaceBox(this.calcFaceLocation(response))
        })
         .catch(err => console.log(err));
            
  
    }

    onRoutChange = (route) =>{
      if(route === 'signout'){
        this.setState({isSignedIn:false})
      }else if(route === 'signin'){
        this.setState({isSignedIn:false})
      }else{
        this.setState({isSignedIn:true})
      }
       this.setState({route:route})
    }
  render() {
    return (
      <div className="App">

         <Particles 
            className='particles'
            params={particlesOptions}
           />
              <Navigation 
                isSignedIn={this.state.isSignedIn} 
                onRoutChange ={this.onRoutChange}                
              />
          { this.state.route === 'home'
          ? 
            <div>
                <Logo />
                <Rank
                   name={this.state.user.name}
                   entries={this.state.user.entries}
                 />
                <ImageLinkForm
                  onInputChange = {this.onInputChange}
                  onButtonSubmit = {this.onButtonSubmit}/>
                <FaceRecognition 
                  box={this.state.box} 
                  imageURL={this.state.imageURL}                     
                  />
            </div>
          : (
            this.state.route === 'signin'
            ?  <Signin 
                  onRoutChange ={this.onRoutChange}
                 />
            :  <Register 
                  onRoutChange ={this.onRoutChange}
                  loadUser = {this.loadUser}
                 />
          )
         
         
          }
      </div>
    );
  }
}

export default App;
  