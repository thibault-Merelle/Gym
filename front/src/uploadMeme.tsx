import React, { useEffect, useState } from "react";
import axios from "axios"
import "./App.css";
import imgMario from "./mario2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const uploadMeme = {
  Upload: function () {
    
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
        <div className="form2">
          <label htmlFor="">Name</label>
          <input type="text" name="name" />

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
  },
  UploadData : function () {
    const options = [
      { value: "Sport" },
      { value: "Musique" },
      { value: "Comédie" },
      { value: "Cinema" }
    ];

    const [category, setCategory] = useState();
    const [name, setName] = useState();
    const [urlMeme, setUrlMeme] = useState();
    const onchangeSelect = (item) => {
      setCategory(item.value);
    };

    return (
      <div className="form2">
        <label htmlFor="">Name</label>
        <input type="text" name="name" />
        
        <Select
          value={category}
          onChange={onchangeSelect}
          options={options}
          getOptionValue={(option) => option.value}
          getOptionLabel={(option) => option.value}
        />

        <label htmlFor="">url du meme</label>
        <input type="text" name="urlMeme" />

         <button
          onClick={async () => {
            const res = await axios(
              // `http://localhost:4000/Localisation/${search}`
              `https://yomathiapp.azurewebsites.net/Localisation/${search}`
            );
            setResult(res.data);
          }}
        ></button>
      </div>
    );
  }
};

export default uploadMeme;
