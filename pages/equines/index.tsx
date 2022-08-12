import Link from 'next/link';
import type { NextApiHandler } from 'next';
import { useEffect, useState } from 'react';

export default function Equines() {
    
    interface MyEquines {
        id: number,
        name: string,
        category: string,
        onHold: boolean,
        programme: string,
        skills: string,
        trainerId: number,
        training: string,
        yard: string
    }
    const [equines, setEquines] = useState<MyEquines[]>([]);

    function getEquines(){
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines`)
        .then(response => response.json())
        .then(data => setEquines(data))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    useEffect( () => {getEquines()},[]);

    
    return (
        <div>
            <h1>EQUINES Page</h1>
            <div>
                {equines.map((equine, index) => {
                    return(
                        <div key={equine.id}>
                            <h2>{equine.name}</h2>
                        </div>
                    )
                })}
            </div>
            <div>
                <Link href="/">
                    <a>Go to the homepage</a>
                </Link>
                <Link href="/equines/add-equine">
                    <a>Add a new equine</a>
                </Link>
            </div>
        </div>
    );
}
