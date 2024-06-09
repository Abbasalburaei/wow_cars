import { BrandProps } from "./brandProps";
import { ModelProps } from "./modelProps";
import { PriceProps } from "./priceProps";
import { SallerProps } from "./sallerProps";

export type CarProps = {
    id:number,
    mainImgPath?:string,
    name:string,
    brand:BrandProps,
    model:ModelProps,
    price:PriceProps,
    altImgs?:string[]
    status:'New' | 'Accident',
    saller?:SallerProps
}

