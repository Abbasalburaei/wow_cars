"use client";
import { Slider, SliderChangeEvent } from "primereact/slider";
import { useEffect, useState } from "react";
import { BaseControlProps } from "../types/baseControlProps";

type CustomRangeProps = {
minValue:number | undefined,
maxValue:number | undefined,
suffix?:string,
onChange:(minVal : number | undefined , maxVal : number | undefined) =>void
} & BaseControlProps;

export default function CustomRange({
name,
title,
className,
minValue,
maxValue,
suffix,
onChange
}:CustomRangeProps){
    const [rangeValue,setRangeValue] = useState<number[]>([]);
    useEffect(()=>{
      setRangeValue([minValue ?? 0,maxValue ?? 0]);
    },[maxValue,minValue]);

    return(
        <div className={`flex flex-col gap-4 ${className}`}>
        <label 
        htmlFor={name} 
        className="text-wowPrimary capitalize">{title}</label>
        <div className="flex flex-row items-center gap-5 w-full">
          <div className=" bg-wowSecondary h-[3rem] rounded-sm w-[6rem]  flex flex-row items-center justify-evenly text-white ">{rangeValue[0] ?? undefined}{suffix &&<span>{suffix}</span>}</div>
          <Slider 
          name={name} 
          min={minValue} 
          max={maxValue} 
          value={[rangeValue[0],rangeValue[1]]} 
          onChange={(e: SliderChangeEvent) =>{
            if(Array.isArray(e.value) && e.value?.length  == 2){
                setRangeValue(e.value as number []);
                if(onChange){
                    onChange(e.value[0],e.value[1]);
                }
            }
          }}  range  className="w-full"/>
      
          <div className=" bg-wowSecondary h-[3rem] rounded-sm w-[6rem] flex flex-row items-center justify-evenly  text-white ">{rangeValue[1] ?? undefined}{suffix &&<span>{suffix}</span>}</div>
          </div>
        </div>
    )
}