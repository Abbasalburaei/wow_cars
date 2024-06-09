"use client";
import { useEffect, useState } from "react";
import { CarContext, CarContextProps } from "../contexts/carContext";
import cars from "@/lib/fakeData/cars.json";
import { CarProps } from "../types/carProps";
import { max, min } from "lodash";
export default function CarProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){

    const carsList = cars as CarProps [];
    const [data,setData] = useState<CarContextProps>({
         cars : carsList,
         priceRange:[],
    });

    useEffect(()=>{
        if(data?.cars?.length > 0){
           const vals = data?.cars?.map(e=>e.price?.price);
           const maxPrice =  max(vals) ?? 0;
           const minPrice =  min(vals) ?? 0;
           setData({...data,priceRange:[minPrice,maxPrice]});
        }
    },[]);

    return (
        <CarContext.Provider value= {data}>
            {children}
        </CarContext.Provider>
    )
}