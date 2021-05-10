import React from 'react';
import './App.css';
import imgMario from "./mario.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";


function App() {

  return (
    <div className="App">
      <div className="entete">
        <FontAwesomeIcon icon={faDumbbell} className="muscul" />
        <h1>GYM UPLOAD</h1>
        <FontAwesomeIcon icon={faDumbbell} className="muscul" />
      </div>

      <div className="img-mario">
        <img src={imgMario} alt="image mario" />
      </div>
      <div className="form">
        <form
          method="POST"
          action="https://gym-test-adds.azurewebsites.net/api/uploadMeme?code=WMPZjMdlRA8rlEnm4HgdGyT1K3Z3ynLC9qcYIPOGpa3jBpJzNQVumg=="
          encType="multipart/form-data"
        >
          <input type="file" name="filename" />
          <button type="submit" className="push">
            Up to GYM
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
