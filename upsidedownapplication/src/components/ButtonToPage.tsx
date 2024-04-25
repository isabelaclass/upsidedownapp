'use client'
import { useRouter } from 'next/navigation'


export default function ButtonToPage(){
    const router = useRouter()

    return(
        <div>
           <button type="button" onClick={() => router.push('/upsidedown')}>Inverter Mundos</button>
        </div>
    )
}