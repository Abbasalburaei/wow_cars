import { createContext } from "react";
import { CarProps } from "../types/carProps";
export type CarContextProps = {
    cars:CarProps[] | [],
    priceRange:number[] | undefined,
};
export const CarContext = createContext<CarContextProps>({
    cars:[],
    priceRange : [0,0],
});