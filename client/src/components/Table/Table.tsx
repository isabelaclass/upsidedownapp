"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:4000/api/upsideDown",
  timeout: 1000,
});

const Table: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const getAll = () => {
    instance
      .get("/getAll")
      .then(function (response) {
        if (response.status === 200) {
          console.log("all", response.data)
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
        console.log("getCharacters function: ", response.data);
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
        console.log("getAges function: ", response.data);
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
        console.log("getExperiences function: ", response.data);
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
          console.log(data)
        }
        console.log("getNames function: ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Filter elements based on selection
  const filterSelection = (c: string) => {
    let x: HTMLCollectionOf<Element> =
      document.getElementsByClassName("filterDiv");
    if (c === "all") c = "";

    // Add the "show" class (display:block) to the filtered elements,
    // and remove the "show" class from the elements that are not selected
    for (let i = 0; i < x.length; i++) {
      RemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) {
        AddClass(x[i], "show");
      }
    }
  };

  // Show filtered elements
  const AddClass = (element: Element, name: string) => {
    let arr1: string[] = element.className.split(" ");
    let arr2: string[] = name.split(" ");

    for (let i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) === -1) {
        element.className += " " + arr2[i];
      }
    }
  };

  // Hide elements that are not selected
  const RemoveClass = (element: Element, name: string) => {
    let arr1: string[] = element.className.split(" ");
    let arr2: string[] = name.split(" ");

    for (let i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
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
    if (category) {
      filterSelection(category);
    }
    if (category != "all") {
      document.getElementById("search").style.display = "block"
    } else {
      document.getElementById("search").style.display = "none"
    }
  }

  // Initially call the filter function to show all items

  // useEffect vai permitir com que esas função rode apenas após o carregamento
  // da página, fazendo com que o `document` exista nesse momento.
  useEffect(() => {
    getAll();
  }, []);

  const search = () => {
    const activeCategory = document.getElementsByClassName("active")[0].attributes[1].value
    const inputData = document.getElementById("search_param").value

    if (activeCategory == "name") {
      getName(inputData)
    }
    if (activeCategory == "character") {
      getCharacters(inputData)
    }
    if (activeCategory == "age") {
      getAge(inputData)
    }
    if (activeCategory == "experience") {
      getExperience(inputData)
    }
    // else {
    //   getAll()
    // }
  }

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
          <div key={index} className={`filterDiv ${item.category}`}>
            {item.name}, {item.character}, {item.age}, {item.experience}
          </div>
        ))}
      </div>
    </div >
  );
};

export default Table;
