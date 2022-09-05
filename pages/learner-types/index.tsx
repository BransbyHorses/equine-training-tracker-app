import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LearnerTypes() {
    
    interface MyLearnerTypes {
        id: number,
        name: string,
    }
    const [yards, setYards] = useState<MyLearnerTypes[]>([]);

    function getLearnerTypes(){
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/learner-types`)
        .then(response => response.json())
        .then(data => setYards(data))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    useEffect( () => {getLearnerTypes()},[]);

    
    return (
        <div>
            <h1>Learner Types</h1>
            <div>
                {yards.map((learnerTypes) => {
                    return(
                        <div key={learnerTypes.id}>
                            <h2>{learnerTypes.name}</h2>
                        </div>
                    )
                })}
            </div>
            <div>
                <Link href="/">
                    <a>Go to the homepage</a>
                </Link>
                <Link href="/learner-types/add-learner-type">
                    <a>Add a new Learner Type</a>
                </Link>
            </div>
        </div>
    );
}
