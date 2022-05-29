import React, { ReactElement, useState } from "react";
import { useQuery } from "react-query";
import { ICharacter, IResult } from "../interfaces";
import Character from "./Character";

export default function Characters():ReactElement {

    const [page, setPage] = useState(1)

    const getCharacters = async ({queryKey}: {queryKey:Array<unknown>}) => {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`)
        return response.json()
    }

    const {data, status, isPreviousData, isLoading, isError} = useQuery(['characters', page], getCharacters, {keepPreviousData: true})

    if (isLoading) {
        return <div className="loading">Loading...</div>
    }

    if (isError) {
        return <div className="loading error">ERROR!</div>
    }

    if (data) {

        let resultData = data as IResult

        return <>
            <div className="buttonContainer">
                Page {page} of {resultData.info.pages}
                <button disabled={isPreviousData || page===1} onClick={() => {setPage(page - 1)}}>Previous</button>
                <button disabled={isPreviousData || !resultData.info.next} onClick={() => {setPage(page + 1)}}>Next</button>
            </div>
            <div className="characters">
            {
                resultData.results.map(
                    (char:ICharacter, idx:number) => 
                    <Character key={idx} character={char} />
                )
            }
            </div>
        </>
    }

    return <div>OTHER UNKNOWN ERROR!</div>
}
