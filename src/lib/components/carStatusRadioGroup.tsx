"use client";
import { RadioButton } from "primereact/radiobutton";
import { BaseControlProps } from "../types/baseControlProps";
import { useState } from "react";
type CarStatusRadioGroupProps = {
    isRequired?:boolean,
    onChange?:(value?:'New' |  'Accident') => void,
    values: {name:string,value:string}[]
} & BaseControlProps;
export default function CarStatusRadioGroup(
    {
     values,
     name,
     onChange,
     title,
     isRequired = false
    }:CarStatusRadioGroupProps
) {

    const [activeOption,setActiveOption] = useState(null);

    return (
        <div className="flex flex-col gap-4">
        <span className=" text-wowPrimary capitalize">{title} {isRequired && <code className="text-red-400">*</code>}</span>
        <div className="flex flex-wrap flex-row items-center gap-3">
   
            {
                values?.map((e)=>( <div className="flex flex-row items-center">
                    <RadioButton  
                    inputId={e.name} 
                    name={name} 
                    value={e.value} 
                    onChange={(e) => {
                        if(onChange){
                            const value = e.value;
                            setActiveOption(value);
                            onChange(value);
                        }
                     }} 
                    checked={e.value === activeOption} />
                    <label htmlFor={e.name} className="ml-2">{e.name}</label>
                </div>))
            }
   
            </div>
        </div>

    )
}