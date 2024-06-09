'use client';
import { InputText } from "primereact/inputtext";
import { HTMLInputTypeAttribute } from "react";

export type InputProps = {
label:string,
name?:string,
error?:string,
defaultValue?:string,
readOnly?:boolean,
disabled?:boolean,
isRequired?:boolean,
className?:string,
onInput?:(event: React.FormEvent<HTMLInputElement>,validationPattern : boolean)=> void ,
type?:HTMLInputTypeAttribute,
maxLength?:number
};

export default function InputValue({
    label,
    name ,
    error ,
    readOnly = false,
    defaultValue, 
    isRequired= false , 
    disabled = false, 
    className , 
    onInput , 
    type = 'text' , 
    maxLength}:InputProps){
return <div className="flex flex-col gap-2">
<label htmlFor={name}>{label} {isRequired && <code className="text-red-400">*</code>}</label>
<InputText defaultValue={defaultValue} disabled = {disabled} maxLength={maxLength} type={type}  readOnly={readOnly} onInput={onInput} className={`${error && 'p-invalid'} ${className}`} name={name}/>
 {error && <small className=" text-red-400 ">{error}</small>}
</div>
}
