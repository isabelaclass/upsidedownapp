import Image from "next/image";
import styles from "./page.module.css";


export default function Home() {
  return (
    <main>
      <Image
        src="/logo.svg"
        width={500}
        height={500}
        alt="Upsie down title"
        />
    </main>
  );
}
