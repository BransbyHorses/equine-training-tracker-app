import { useRouter } from 'next/router';

export default async function EquineId (){
    const res = await fetch('http://localhost:8080')
    const json = await res.json()
  
    const router = useRouter();

    return(
        <div>
            <h1>Equine</h1>
            <p>Horse id: {router.query.id}</p>
        </div>
    )
}