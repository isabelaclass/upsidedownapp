import Image from "next/image";
import Simples from "@/components/Simples";
import SimpleWithChildren from '@/components/SimpleWithChildren';
import SimpleWithParam from '@/components/SimpleWithParam';
import Button from '@/components/Button'
import ButtonToPage from '@/components/ButtonToPage'
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
          <label>Nome: </label>
        <input name="name" />
        </div>

        <div>
          <label>E-mail: </label>
          <input name="name" />
        </div>
      
      <Button/>
      </div>
    </main>
  );
}

