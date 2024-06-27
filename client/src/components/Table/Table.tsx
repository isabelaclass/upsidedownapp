"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useUserState } from "../../../userState";

const instance = axios.create({
  baseURL: "http://127.0.0.1:4000/api/upsideDown",
  timeout: 1000,
});

const Table: React.FC = () => {
  const data = useUserState((state) => state.data)
  const setData = useUserState((state) => state.setData)
  const reset = useUserState((state) => state.reset)

  const getAll = () => {
    instance
      .get("/getAll")
      .then(function (response) {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCharacters = (character: string) => {
    instance
      .get(`/queryCharacter/${character}`)
      .then(function (response) {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getAge = (age: string) => {
    instance
      .get(`/getAge/${age}`)
      .then(function (response) {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getExperience = (experience: string) => {
    instance
      .get(`/getExperience/${experience}`)
      .then(function (response) {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getName = (name: string) => {
    instance
      .get(`/getName/${name}`)
      .then(function (response) {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const SetActiveButton = (event: { currentTarget: HTMLElement; }) => {
    let current: HTMLCollectionOf<Element> =
      document.getElementsByClassName("active");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    (event.currentTarget as HTMLElement).className += " active";
    const category = (event.currentTarget as HTMLElement).getAttribute(
      "data-category"
    );

    if (category != "all") {
      reset();
      document.getElementById("search").style.display = "block"
    } else {
      document.getElementById("search").style.display = "none"
    }

    if (category == "all") {
      getAll();
    }
  }

  const search = () => {
    const activeCategory = document.getElementsByClassName("active")[0].attributes[1].value
    const inputData = document.getElementById("search_param").value

    if (activeCategory == "name") {
      getName(inputData)
    }
    else if (activeCategory == "character") {
      getCharacters(inputData)
    }
    else if (activeCategory == "age") {
      getAge(inputData)
    }
    else if (activeCategory == "experience") {
      getExperience(inputData)
    }
  }

  // useEffect vai permitir com que esas função rode apenas após o carregamento
  // da página, fazendo com que o `document` exista nesse momento.
  // useEffect(() => { getAll() }, []);

  return (
    <div>
      <div id="myBtnContainer">
        <button onClick={SetActiveButton} className="btn active" data-category="all">
          Mostrar tudo
        </button>
        <button onClick={SetActiveButton} className="btn" data-category="name">
          Nome
        </button>
        <button onClick={SetActiveButton} className="btn" data-category="age">
          Idade
        </button>
        <button onClick={SetActiveButton} className="btn" data-category="character">
          Personagem
        </button>
        <button onClick={SetActiveButton} className="btn" data-category="experience">
          Nível
        </button>
        <br />
        <div style={{ display: "none" }} id="search">
          <input type="text" id="search_param" />
          <button onClick={search} className="btn">Pesquisar</button>
        </div>
      </div>

      <div className="selection-container">
        {data.map((item, index) => (
          <div key={index} className={`filterDiv ${item.category} show`}>
            {item.name}, {item.character}, {item.age}, {item.experience}
          </div>
        ))}
      </div>
    </div >
  );
};

export default Table;
