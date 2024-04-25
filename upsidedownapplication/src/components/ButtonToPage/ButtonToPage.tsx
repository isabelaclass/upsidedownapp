'use client'
import { useRouter } from 'next/navigation'
import './style.css'

export default function ButtonToPage(){
    const router = useRouter()

    return(
        <div className='button'>
           <button type="button" onClick={() => router.push('/upsidedown')}>Inverter Mundos</button>
        </div>
    )
}