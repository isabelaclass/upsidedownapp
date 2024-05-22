import React, { ReactNode } from 'react';
import Image from 'next/image';
import './SimpleWithParam.css'

interface SimpleWithParamProps {
    src: string;
  }  

  const SimpleWithParam: React.FC<SimpleWithParamProps> = ({ src }) => {

    return (<>
      <Image
        src={src}
        width={400}
        height={300}
        alt="Imagem dos personagens" className='imagens_all' />
    </>
    )
  }

  export default SimpleWithParam;
  
