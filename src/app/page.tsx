"use client";
import CustomRange from "@/lib/components/customRange";
import Section from "@/lib/components/section";
import { Button } from "primereact/button";
import { faFilter} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider } from "primereact/divider";
import CarCard from "@/lib/components/carCard";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { cache, useContext, useState } from "react";
import Container from "@/lib/components/container";
import CustomDropdown, { DropdownItemProps } from "@/lib/components/controls/customDropdown";
import { generateYears } from "@/lib/utils/staff";
import brands from "@/lib/fakeData/brands.json";
import cases from "@/lib/fakeData/status.json";
import { CarContext } from "@/lib/contexts/carContext";
import { CarProps } from "@/lib/types/carProps";
import { includes, split } from "lodash";

const modelYears  = cache(()=>generateYears(2000)?.map<DropdownItemProps>(e=>({text:e.toString(),value:e.toString()})).toReversed());
export default function Home() {

  const {priceRange , cars} = useContext(CarContext);
  //------------------------------------------------------------------------------------
  const [filterShow,setFilterShow] = useState(false);
  const [models] = useState<DropdownItemProps[] | [] | undefined>(modelYears);
  const [brandOptions] = useState<DropdownItemProps[] | []>(brands);
  const [filterCars,setFilterCars] = useState(cars);
  const [finalFilterCars,setFinalFilterCars] = useState(cars);
  const [searchOptions,setSearchOptions] = useState<{
    model?:number,
    price?:number [] 
  }>()
  const [selectedBrands,setSelectedBrands] = useState<string | undefined>(undefined);
  const [selectedStatus,setSleectedStatus] = useState<string | undefined>(undefined);
  const [loading,setLoading] = useState(false);
  //-------------------------------------------------------------------------------------
  const handleSearch = ()=>{
      setLoading(true);
      if(cars && cars?.length > 0){
        let result : CarProps [] | [] = cars;
        if(searchOptions && searchOptions?.model){
           result = result?.filter(e=> (searchOptions?.model && e.model.year == searchOptions?.model));
        }
        if(searchOptions && searchOptions?.price){
           const minValue = searchOptions.price?.at(0) as number;
           const maxValue = searchOptions.price?.at(1) as number;
           result = result?.filter(e=>e.price.price >= minValue);
           result = result?.filter(e=>e.price.price <= maxValue);
        }
        setFilterCars(result);
        setFinalFilterCars(result);
      }
      setLoading(false);
  };

  const handleBrandsFilter = (value:string | undefined)=>{
    if(filterCars && filterCars?.length > 0){
      let result : CarProps [] | [] = filterCars;
      if(value && value?.length > 0){
        const brandsLst = split(value,",")?.map(e=>e?.trim());
        if (brandsLst?.length > 0){
          result = result.filter(e=> includes(brandsLst,e.brand.name));
        }
      }
      setFinalFilterCars(result);
    }
  };

  const handleStatusFilter = (value:string | undefined)=>{
    if(filterCars && filterCars?.length > 0){
      let result : CarProps [] | [] = filterCars;
      if(value && value?.length > 0){
        const statusLst = split(value,",").map(e=>e?.trim());
        if (statusLst?.length > 0){
          result = result.filter(e=> includes(statusLst,e.status));
        }
      }
      setFinalFilterCars(result);
    }
  };


  return (
    <Container>

    <section className="flex flex-col">
      <Section 
        title="Welcome to you in Wow cars website"
        subTitle="Here you can search and puy cars that fit with your options and price."
      />
      <div className="mt-10" />
      <div className="bg-white border border-wowLightGray sm:w-[95%] p-5 w-full mx-auto min-h-[5rem] rounded-md gap-5 flex flex-col">
        <div className="flex md:flex-row flex-col gap-4">
          <CustomDropdown
           options={models}
            className="grow order-1"
            name="model"
            title="Model"
            placeholder="Choose model"
            onChange={(e)=>{
              setSearchOptions({...searchOptions,model:e.value});
            }}
          />
          <CustomRange
            className="grow order-2"
            name="price"
            title="Price"
            minValue={priceRange![0]}
            maxValue={priceRange![1]}
            onChange={(e1, e2) => {
              setSearchOptions({...searchOptions,price:[e1 ?? 0,e2 ?? 0]});
            }}
          />
        </div>
        <Button 
         loading={loading}
         onClick={handleSearch}
         className="flex justify-center">
          Search
        </Button>
      </div>
      <div className="mt-10" />
      <div className="flex flex-col gap-2">

        <div className="relative">
          <Button onClick={()=>{
            setFilterShow(!filterShow);
          }} className="!bg-black  text-white">
            <FontAwesomeIcon icon={faFilter} />
          </Button>
        </div>
        <style jsx>
          {
            `
            .filter-box:before{
              content:'';
              position: absolute;
              width:20px;
              height:20px;
              background-color:var(--wow-light-gray-color);
              transform: rotate(45deg);
              left:1rem;
              top:-.5rem;
              z-index:-1;
            }
            `
          }
        </style>
        {filterShow &&  <div className="filter-box mt-1 relative flex sm:flex-row flex-col flex-wrap p-5 gap-4 min-h-[5rem] w-full bg-wowLightGray rounded-md">
          <MultiSelect 
          onChange={(e: MultiSelectChangeEvent) => { 
            setSelectedBrands(e.value);
            handleBrandsFilter(e.value);
          }} 
          value={selectedBrands}
          options={brandOptions} 
          optionLabel="text"
          optionValue="value"
          placeholder="Choose brand"  
          className="grow" />
          <MultiSelect 
          onChange={(e: MultiSelectChangeEvent) => {
            setSleectedStatus(e.value);
            handleStatusFilter(e.value);
           }} 
          value={selectedStatus}
          options={cases} 
          optionLabel="name"
          optionValue="value"
          placeholder="Choose car's status" 
          className="grow" />
        </div>}
        <Divider />
      </div>
      <div className="flex flex-row flex-wrap gap-5">
        {
          finalFilterCars?.map((e) => (
            <CarCard
              key={e.id}
              id={e.id}
              name={e.name}
              model={e.model.year}
              status={e.status}
              price={e.price.price}
              currency={e.price.currency}
              brand={e.brand}
              sallerName={e.saller?.name ?? ''}
              imgPath={e.mainImgPath ?? ''}
            />
          ))
        }
      </div>
    </section>
    </Container>
  );
}
