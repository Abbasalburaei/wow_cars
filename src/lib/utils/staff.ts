import { BrandProps } from "../types/brandProps";
export function getBrandImagePath(brand:BrandProps | undefined) : string{
  if(!brand)
    return '';
  
  const basePath : string = '/assets/brands/';
  return basePath.concat(brand.name,'.png');
}

export function generateYears(startYear : number) : number []  | undefined {
  if(startYear <= 0)
    return undefined;


  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++)
      years.push(year);
  
  return years;
}