import React, { useEffect, useState } from "react";
import axios from "axios"
import "./App.css";
import imgMario from "./mario2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const uploadMeme = {
  UploadData : function () {
    const data = [
      { value: "Category" },
      { value: "Sport" },
      { value: "Musique" },
      { value: "Cinema" },
      { value: "Gaming" },
      { value: "Animals" },
      { value: "Reaction" },
      { value: "Anime" },
      { value: "Food" },
    ];
    const [showResults, setShowResults] = useState(false);
    const [category, setCategory] = useState(data[0]);
    const [name, setName] = useState<any | null>(null);
    const [urlMeme, setUrlMeme] = useState<any | null>(null);
    const onchangeSelect = (item) => {
      setCategory(item.value);
    };

    return (

    <div className="upload">
      <div className="pics">
        <div className="entete">
          <FontAwesomeIcon icon={faDumbbell} className="muscul" />
          <h1>GYM UPLOAD</h1>
          <FontAwesomeIcon icon={faDumbbell} className="muscul" />
        </div>
        <div className="img-mario">
          <img src={imgMario} alt="image mario" />
        </div>
      </div>

      <div className="form-data">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Select
          value={category}
          onChange={onchangeSelect}
          options={data}
          getOptionValue={(option) => option.value}
          getOptionLabel={(option) => option.value}
          className="s1"
        />
        <input
          type="file"
          name="urlMeme"
          id="urlMeme"
          value={urlMeme}
          onChange={(e) => setUrlMeme(e.target.value)}
          className="upfile"
        />

        <button
        className="confirm"
          onClick={async () => {
            setShowResults(true);
            const res = await axios({
              method: `POST`,
              url: `http://localhost:5000/api/meme/form`,
              data: {
                name,
                category: category,
                urlMeme,
              },
            });
          }}
        >Confirmer</button>
      </div>
      {
        showResults ?  <div className="form-file">
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
      </div> : null
      }
     
      </div>
    );
  }
};

export default uploadMeme;
