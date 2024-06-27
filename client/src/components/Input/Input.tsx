"use client";
import React, { useState } from "react";
import "./style.css";
import axios from "axios";

//recebe os nomes das labels como parâmetro
interface Props {
  labelName: string;
  labelEmail: string;
  labelAge: string;
  labelCharacter: string;
  labelExperience: string;
}

const instance = axios.create({
  baseURL: 'http://127.0.0.1:4000/api/upsideDown',
  timeout: 1000,
});

const Input: React.FC<Props> = ({
  labelName,
  labelEmail,
  labelAge,
  labelCharacter,
  labelExperience,
}) => {
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = () => {
    setShowWarning(false);
    setShowSuccess(false);

    const inputName = document.querySelector(
      `input[name="${labelName}"]`
    ) as HTMLInputElement;
    const inputEmail = document.querySelector(
      `input[name="${labelEmail}"]`
    ) as HTMLInputElement;
    const inputAge = document.querySelector(
      `input[name="${labelAge}"]`
    ) as HTMLInputElement;
    const inputCharacter = document.querySelector(
      `input[name="${labelCharacter}"]`
    ) as HTMLInputElement;
    const inputExperience = document.querySelector(
      `select[name="${labelExperience}"]`
    ) as HTMLSelectElement;

    if (
      !inputName.value ||
      !inputEmail.value ||
      !inputAge.value ||
      !inputCharacter.value ||
      !inputExperience.value
    ) {
      setShowWarning(true);
      setShowSuccess(false);
    } else {
      const body = {
        name: inputName.value,
        email: inputEmail.value,
        age: inputAge.value,
        character: inputCharacter.value,
        experience: inputExperience.value
      }
      instance
        .post("/create", body)
        .then(function (response) {
          if (response.status == 200) {
            setShowSuccess(true);
          }
          console.log(response);
        })
        .catch(function (error) {
          setShowWarning(true);
          console.log(error);
        })
    }
  };

  return (
    <div className="form-container">
      <label htmlFor={labelName}>{labelName}</label>
      <input type="text" id={labelName} name={labelName} />

      <label htmlFor={labelEmail}>{labelEmail}</label>
      <input type="text" id={labelEmail} name={labelEmail} />

      <label htmlFor={labelAge}>{labelAge}</label>
      <input type="text" id={labelAge} name={labelAge} />

      <label htmlFor={labelCharacter}>{labelCharacter}</label>
      <input type="text" id={labelCharacter} name={labelCharacter} />

      {/* <label htmlFor={labelExperience}>{labelExperience}</label>
      {/* <input type="text" id={labelExperience} name={labelExperience} /> */}
      <select id={labelExperience} name={labelExperience}>
        <option value="Baixo">Baixo</option>
        <option value="Médio">Médio</option>
        <option value="Alto">Alto</option>
      </select> 

      {showSuccess && <p style={{ color: "green" }}>Bem-vindo ao clube!</p>}

      {showWarning == true ? (
        <p style={{ color: "red" }}>preencha todos os campos.</p>
      ) : (
        <p style={{ color: "transparent" }}>preencha todos os campos.</p>
      )}

      <button onClick={handleClick}>inscrever-se</button>
    </div>
  );
};
export default Input;
