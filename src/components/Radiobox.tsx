export default function Radiobox ({label, name, value, isChecked, onChange} : {label:string, name:string, value:number, isChecked:boolean, onChange:any}) {
    return <label>
        {label}
        <input type="radio" id={value.toString()} name={name} value={value} checked={isChecked} onChange={onChange}></input>
    </label>
}