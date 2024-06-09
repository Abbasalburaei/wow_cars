import carCardStyle from '../../lib/styles/car.module.css';
import Image from "next/image";
import { Tag } from "primereact/tag";
import Link from "next/link";
import { BrandProps } from '../types/brandProps';
import { getBrandImagePath } from '../utils/staff';

type CarCard ={
    id:number,
    model:number,
    status:'New' | 'Accident',
    imgPath:string,
    brand:BrandProps,
    name:string,
    sallerName:string,
    price:number,
    currency:'YER' | 'SAR' | 'USD'
};

export default function CarCard({
    id,
    model,
    status = 'New',
    imgPath,
    brand,
    name,
    sallerName,
    price,
    currency = 'USD'
}:CarCard){
    return(
        <article className={`${carCardStyle.carCard} border-wowGray `}>
        <Link href={`/${id}`} className={`${carCardStyle.cardHeader}`}>
          <div className={`${carCardStyle.carHeaderTags}`}>
            <Tag className="bg-black">{model}</Tag>
            <Tag className="bg-wowSecondary">{status}</Tag>
          </div>
          <div className={`${carCardStyle.cardHeaderBrandTag}`}>
          <Image
            src={getBrandImagePath(brand)}
            alt={brand?.name}
            objectFit='cover'
            height={40}
            width={40}
          /> 
          </div>
          <Image
            alt={name}
            className={carCardStyle.carImg}
            src={imgPath}
            objectFit='contain'
            objectPosition="center"  
            fill
          /> 
        </Link>
        <div className={`${carCardStyle.cardBody}`}>
          <div className="flex flex-row justify-between">
            <div className="font-bold capitalize">{name}</div>
            <Tag className="bg-wowPrimary">{price} {currency}</Tag>
          </div>
          <div className="flex flex-row justify-between">
            <div className="font-bold">Saller</div>
            <div className="text-wowPrimary capitalize">{sallerName}</div>
          </div>
        </div>
    </article>
    )
}