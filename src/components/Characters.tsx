import { ReactElement, useState } from "react";
import { useQuery } from "react-query";
import { ICharacter, IResult } from "../interfaces";
import Character from "./Character";
import Checkbox from "./Checkbox";
import Radiobox from "./Radiobox";

export default function Characters({endpoint} : {endpoint:string}):ReactElement {

    const [page, setPage] = useState(1)
    const [filterStatus, setFilterStatus] = useState(false)
    const [humanStatus, setHumanStatus] = useState(false)
    const [gender, setGenderStatus] = useState(0)

    const getCharacters = async ({queryKey}: {queryKey:Array<unknown>}) => {
        let aliveStatus = filterStatus ? 'alive' : '';
        let speciesStatus = humanStatus ? 'human' : '';
        let genderStatus = gender === 0 ? '' : gender === 1 ? 'male' : 'female'
        const response = await fetch(`${endpoint}?page=${queryKey[1]}&status=${aliveStatus}&species=${speciesStatus}&gender=${genderStatus}`)

        if (response.status !== 200)
        {
            // If the user adds a filter putting them past the new last page, the API returns 404
            setPage(1)
        }
        else
            return response.json()
    }

    const {data, status, isPreviousData, isLoading, isError} = useQuery(
        ['characters', page, filterStatus, humanStatus, gender], 
        getCharacters, 
        {keepPreviousData: true})

    if (isLoading) {
        return <div className="loading">Loading...</div>
    }

    if (isError) {
        console.log("FOUND ERROR")
        return <div className="loading error">ERROR!</div>
    }

    if (data) {

        let resultData = data as IResult

        return <>
            <div className="buttonContainer">
                <button disabled={isPreviousData || page===1} onClick={() => {setPage(page - 1)}}>Previous</button>
                <button disabled={isPreviousData || !resultData.info.next} onClick={() => {setPage(page + 1)}}>Next</button>
                <Checkbox label="Alive only" isChecked={filterStatus} onChange={() => {setFilterStatus(!filterStatus)}} />
                <Checkbox label="Human only" isChecked={humanStatus} onChange={() => {setHumanStatus(!humanStatus)}} />
                <Radiobox label="All" name="gender" value={0} isChecked={gender===0} onChange={() => {setGenderStatus(0)}} />
                <Radiobox label="Male" name="gender" value={1} isChecked={gender===1} onChange={() => {setGenderStatus(1)}} />
                <Radiobox label="Female" name="gender" value={-1} isChecked={gender===-1} onChange={() => {setGenderStatus(-1)}} />
                <p>Page {page} of {resultData.info.pages}</p>
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
