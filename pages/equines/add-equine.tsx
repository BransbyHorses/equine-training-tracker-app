import Link from 'next/link';

export default function NewEquine (){


    return(
        <div>
            <h1>Add an Equine</h1>
            <div>
                <form action="/data/equines" method='post' className='new_form'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id='name' name='name'/>

                    <label htmlFor="equine_yard">Yard:</label>
                    <select name="yard" id="equine_yard">
                        <option value="yard 1">Yard 1</option>
                        <option value="yard 2">Yard 2</option>
                        <option value="yard 3">Yard 3</option>
                        <option value="yard 4">Yard 4</option>
                        <option value="yard 5">Yard 5</option>
                    </select>

                    <label htmlFor="trainer-id"></label>
                    <input type="number" id='trainer_id' min='1' max='20'/>

                    <label htmlFor="category">Category:</label>
                    <select name="category" id="new_yard">
                        <option value="red">Red</option>
                        <option value="amber">Amber</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                    </select>

                    <label htmlFor="programme">Programme:</label>
                    <input type="text" id='programme' name='programme' />

                    <label htmlFor="skills">Skills:</label>
                    <input type="text" id='skills' name='skills' />

                    <label htmlFor="training">Training:</label>
                    <input type="text" id='training' name='training' />

                    <label htmlFor="on_hold">On Hold:</label>
                    <input type="checkbox" />
                </form>
            </div>
            <div>
                <Link href='/equines'>
                    <a>Go back to Equines</a>
                </Link>
            </div>
        </div>
    )
}