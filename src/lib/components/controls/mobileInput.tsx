import { InputProps } from "./inputValue";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";

export default function MobileInput({
    label,
    name ,
    error ,
    readOnly = false,
    defaultValue, 
    isRequired= false , 
    disabled = false, 
    className , 
    onInput , 
    onChange,
    type = 'text' , 
    maxLength}:InputProps & {
        onChange:(event : InputMaskChangeEvent )=> void
    }){
return <div className="flex flex-col gap-2">
<label htmlFor={name}>{label} {isRequired && <code className="text-red-400">*</code>}</label>
< InputMask mask="999-999999999" placeholder="999-999999999" defaultValue={defaultValue} disabled = {disabled} maxLength={maxLength} type={type}  readOnly={readOnly} onChange={onChange} className={`${error && 'p-invalid'} ${className}`} name={name}/>
 {error && <small className=" text-red-400 ">{error}</small>}
</div>
}