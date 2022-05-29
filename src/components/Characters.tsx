import React, { ReactElement, useEffect, useState } from "react";

export default function Characters():ReactElement {

    interface Person {
        id:number
        name:string
        status:string
        image:string
        [key:string]:any
    }

    const [characters, setCharacters] : [Array<Person>, Function] = useState([]);

    const getCharacters = async () => {
        const response = await fetch('https://rickandmortyapi.com/api/character')
        const data = await response.json()
        setCharacters(data?.results as Array<Person>)
    }

    useEffect(() => {
        getCharacters()
    }, [])

    return <ul>
        {characters.length ? (
            characters.map(
                    (char, idx) => 
                    <li key={char.id}>{char.name}</li>
                )
        ) : 'Loading...'
        }
    </ul>;
}
