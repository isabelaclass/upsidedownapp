"use client";
import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";

interface Props {
  labelId: string;
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

const UpdateInput: React.FC<Props> = ({
  labelId,
  labelName,
  labelEmail,
  labelAge,
  labelCharacter,
  labelExperience,
}) => {
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userId, setUserId] = useState("");
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    instance.get("/getAll")
      .then(response => {
        if (response.status === 200) {
          const fetchedIds = response.data.map((item: { _id: string }) => item._id);
          setIds(fetchedIds);
        }
      })
      .catch(error => {
        console.error("Error fetching IDs:", error);
      });
  }, []);

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
      !userId ||
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
        experience: inputExperience.value,
      };

      instance
        .patch(`/update/${userId}`, body)
        .then(function (response) {
          if (response.status === 200) {
            setShowSuccess(true);
          }
          console.log(response);
        })
        .catch(function (error) {
          setShowWarning(true);
          console.log(error);
        });
    }
  };

  return (
    <div className="form-container">
      <label htmlFor={labelId}>{labelId}</label>
      <select id={labelId} name={labelId} onChange={(e) => setUserId(e.target.value)}>
        <option value="">Selecione um ID</option>
        {ids.map((id) => (
          <option key={id} value={id}>{id}</option>
        ))}
      </select>

      {showSuccess && <p style={{ color: "green" }}>Dados atualizados com sucesso!</p>}

      {showWarning && <p style={{ color: "red" }}>Preencha todos os campos acima.</p>}

      <button onClick={handleClick}>Atualizar</button>
    </div>
  );
};
export default UpdateInput;
