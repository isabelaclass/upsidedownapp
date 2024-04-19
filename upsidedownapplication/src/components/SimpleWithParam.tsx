import React, { ReactNode } from 'react';
import Image from 'next/image';

interface SimpleWithParamProps {
    src: string;
  }  

  const SimpleWithParam: React.FC<SimpleWithParamProps> = ({ src }) => {

    return (<div className='cardSerie'>
      <Image
        src={src}
        width={480}
        height={300}
        alt="Imagem dos personagens" />
    </div>
    )
  }

  export default SimpleWithParam;
  
