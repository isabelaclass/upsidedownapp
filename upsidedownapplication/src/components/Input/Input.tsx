'use client'
import React, { useState } from 'react';
import './style.css'

//recebe os nomes das labels como parâmetro
interface Props {
  labelName: string;
  labelEmail: string;
}

const Input: React.FC<Props> = ({ labelName, labelEmail }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleClick = () => {
    setShowWarning(false);
    setShowSuccess(false);
    const inputName = document.querySelector(`input[name="${labelName}"]`) as HTMLInputElement;
    const inputEmail = document.querySelector(`input[name="${labelEmail}"]`) as HTMLInputElement;
    
    if (!inputName.value || !inputEmail.value) {
      setShowWarning(true);
      setShowSuccess(false);
    } else {
      setShowSuccess(true);
    }
  }

  return (
    <div className='form-container'>
       <label htmlFor={labelName}>{labelName}</label>
       <input type="text" id={labelName} name={labelName}/>

       <label htmlFor={labelEmail}>{labelEmail}</label>
       <input type="text" id={labelEmail} name={labelEmail} />
      
       {showSuccess && (
          <p style={{ color: 'green' }}>
            Parabéns, agora você faz parte do clube!
          </p>
        )}

      {showWarning == true? 
        <p style={{ color: 'red' }}>
          preencha todos os campos.
        </p>
      :<p style={{ color: 'transparent' }}>
      preencha todos os campos.
      </p>}

      <button onClick={handleClick}>inscrever-se</button>
    </div>
  )
}
export default Input

