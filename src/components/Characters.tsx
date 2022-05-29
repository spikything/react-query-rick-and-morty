import React, { ReactElement } from "react";
import { useQuery } from "react-query";

export default function Characters():ReactElement {

    interface Result {
        info:object
        results:Array<ICharacter>
    }

    interface ICharacter {
        id:number
        name:string
        status:string
        image:string
        [key:string]:any
    }

    const getCharacters = async () => {
        const response = await fetch('https://rickandmortyapi.com/api/character')
        return response.json();
    }

    const {data, status} = useQuery('characters', getCharacters)

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    if (status === 'error') {
        return <div>ERROR!</div>
    }

    if (data) {

        return <ul>
            Characters: {data.results.length}
            <br />
            <br />
            {
                data.results.map(
                    (char:ICharacter, idx:number) => 
                    <li key={char.id}>
                        <img src={char.image} width='50' />
                        &nbsp;
                        {char.name}
                    </li>
                )
            }
        </ul>;

    }

    return <div>OTHER UNKNOWN ERROR!</div>
}
