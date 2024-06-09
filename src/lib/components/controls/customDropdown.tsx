import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useState } from "react";
import { BaseControlProps } from "../../types/baseControlProps";
export type DropdownItemProps = {
    text: string,
    value: any
};
type CustomDropdownProps = {
    placeholder?: string,
    isRequired?:boolean,
    error?:string,
    options?: DropdownItemProps[],
    onChange? : (event : DropdownChangeEvent)=>void
} & BaseControlProps;
export default function CustomDropdown({
    name,
    title,
    className,
    error,
    placeholder,
    options = [],
    onChange,
    isRequired = false
}: CustomDropdownProps) {

    const [selectedValue,setSelectedValue] = useState(undefined);

    return (<div className={`flex flex-col gap-2 ${className}`}>
        <label htmlFor={name} className=" text-wowPrimary capitalize">{title} {isRequired && <code className="text-red-400">*</code>}</label>
        <Dropdown name={name}
            value={selectedValue}
            options={[...options]}
            optionLabel="text"
            optionValue="value"
            required ={isRequired}
            placeholder={placeholder}
            className={`w-full ${error && 'p-invalid'} ${className}`}
            onChange={(event)=>{
                if(onChange){
                    onChange(event);
                    setSelectedValue(event.value);
                }
            }}
             />
         {error && <small className=" text-red-400 ">{error}</small>}
    </div>)
}