"use client";
import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";

interface Props {
  labelId: string;
}

const instance = axios.create({
  baseURL: 'http://127.0.0.1:4000/api/upsideDown',
});

const DeleteInput: React.FC<Props> = ({ labelId }) => {
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

    if (!userId) {
      setShowWarning(true);
      setShowSuccess(false);
    } else {
      instance
        .delete(`/delete/${userId}`)
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

      {showSuccess && <p style={{ color: "green" }}>Dados apagados com sucesso!</p>}

      {showWarning && <p style={{ color: "red" }}>Selecione um ID.</p>}

      <button onClick={handleClick}>Apagar</button>
    </div>
  );
};

export default DeleteInput;
