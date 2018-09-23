import React from 'react';


const FaceRecognition = ({imageURL}) => {
    return(
        <div className="center pt5 ma">
          <div className="absolute">
          <img alt="img" src={imageURL} width='500px' height='auto'  /> 
          </div>
        </div>
    )
  }
   export default FaceRecognition; 