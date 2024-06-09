import { BrandProps } from "./brandProps"
import { ModelProps } from "./modelProps"
import { PriceProps } from "./priceProps"
import { SallerProps } from "./sallerProps"

export type AddCarProps = {
    id:number,
    name?:string | null,
    brand?:BrandProps | null,
    model?:ModelProps | null,
    price?:PriceProps | null,
    status?:'New' | 'Accident' | null,
    saller?:SallerProps | null
}