import Image from "next/image";
import Simples from "@/components/Simples";
import SimpleWithChildren from '@/components/SimpleWithChildren';
import SimpleWithParam from '@/components/SimpleWithParam';
import Button from '@/components/Button'
import ButtonToPage from '@/components/ButtonToPage/ButtonToPage'
import Input from '@/components/Input/Input'
import './page.css'


export default function Home() {
  return (
    <main>
      <Image
        src="/logo.svg"
        width={500}
        height={150}
        alt="Upside down title" className="logo_principal"
        />
        <Simples/>
        <ButtonToPage/>
        <SimpleWithChildren>
        <h1 className="title">O CLUBE DUNGEONS & DRAGONS</h1>
      </SimpleWithChildren>
      <div className='card-container'>
        <SimpleWithParam src="/serie-image-01.png"/>
        <SimpleWithParam src="/serie-image-02.png"/>
        <SimpleWithParam src="/serie-image-03.png"/>
      </div>
      <div className='form'>
        <div>
          <Input labelName="Nome" labelEmail="Email">
          </Input>
        </div>
      </div>
    </main>
  );
}

