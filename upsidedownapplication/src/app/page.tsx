import Image from "next/image";
import Simples from "@/components/Simples";
import SimpleWithChildren from '@/components/SimpleWithChildren';
import SimpleWithParam from '@/components/SimpleWithParam';
import Button from '@/components/Button'


export default function Home() {
  return (
    <main>
      <Image
        src="/logo.svg"
        width={500}
        height={500}
        alt="Upside down title"
        />
        <Simples/>
        <SimpleWithChildren>
        <h1>O CLUBE DUNGEONS & DRAGONS</h1>
      </SimpleWithChildren>
      <div className='card-container'>
        <SimpleWithParam src="/serie-image-01.png"/>
        <SimpleWithParam src="/serie-image-02.png"/>
        <SimpleWithParam src="/serie-image-03.png"/>
      </div>
      <div className='form'>
      Nome: <input name="name" />
      E-mail: <input name="name" />
      <Button/>
      </div>
    </main>
  );
}

