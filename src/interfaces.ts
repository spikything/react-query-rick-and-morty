export interface IResult {
    info:IDataInfo
    results:Array<ICharacter>
}

export interface IDataInfo {
    pages:number
    next:string | null
}

export interface ICharacter {
    id:number
    name:string
    status:string
    species:string
    image:string
    origin:any
    location:any
    [key:string]:any // for all the other props
}