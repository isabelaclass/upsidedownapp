//Realiza todos os imports necessários para o código
import Image from "next/image";
import Texto from "@/components/Texto";
import SimpleWithParam from '@/components/SimpleWithParam';
import ButtonToPage from '@/components/ButtonToPage/ButtonToPage'
import Input from '@/components/Input/Input'
import './page.css'


export default function Home() {
  return (
    <main>
      {/* Renderiza a imagem do logo */}
      <Image
        src="/logo.svg"
        width={500}
        height={150}
        alt="Upside down title" className="logo_principal"
        />
        {/* Renderiza o componente "Texto" que contém o texto de abertura da página*/}
        <Texto/>
        {/* Renderiza o componente "ButtonToPage" que leva ao UpsideDown*/}
        <ButtonToPage/>
        {/* Título do clube*/}
        <h1 className="title">O CLUBE DUNGEONS & DRAGONS</h1>
        {/* Renderiza o componente que recebe o src da imagem como parâmetro*/}
      <div className='card-container'>
        <SimpleWithParam src="/serie-image-01.png"/>
        <SimpleWithParam src="/serie-image-02.png"/>
        <SimpleWithParam src="/serie-image-03.png"/>
      </div>
      <div className='form'>
        <div>
          {/* Renderiza o componente que recebe os nomes das lebsn como parâmetro e mostra no formulário*/}
          <Input labelName="Nome" labelEmail="Email">
          </Input>
        </div>
      </div>
    </main>
  );
}

