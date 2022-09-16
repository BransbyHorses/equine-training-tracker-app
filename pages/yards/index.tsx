import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Yards() {
    
    interface MyYards {
        id: number,
        name: string,
    }
    const [yards, setYards] = useState<MyYards[]>([]);

    function getYards(){
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/yards`)
        .then(response => response.json())
        .then(data => setYards(data))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    useEffect( () => {getYards()},[]);

    
    return (
        <div>
            <h1>Yards</h1>
            <div>
                {yards.map((yard, index) => {
                    return(
                        <div key={yard.id}>
                            <h2>{yard.name}</h2>
                        </div>
                    )
                })}
            </div>
            <div>
                <Link href="/">
                    <a>Go to the homepage</a>
                </Link>
                <Link href="/yards/add-yard">
                    <a>Add a new yard</a>
                </Link>
            </div>
        </div>
    );
}

