export default function Checkbox ({label, isChecked, onChange} : {label:string, isChecked:boolean, onChange:any}) {
    return <label>
        {label}
        <input type='checkbox' checked={isChecked} onChange={onChange}></input>
    </label>
}