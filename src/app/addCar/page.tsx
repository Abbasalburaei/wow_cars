"use client";
import CarStatusRadioGroup from "@/lib/components/carStatusRadioGroup";
import Container from "@/lib/components/container";
import CustomDropdown, { DropdownItemProps } from "@/lib/components/controls/customDropdown";
import InputValue from "@/lib/components/controls/inputValue";
import Section from "@/lib/components/section";
import SectionForm from "@/lib/components/sectionForm";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { FileUpload } from "primereact/fileupload";
import { cache, useContext, useRef, useState } from "react";
import { z } from "zod";
import brands from "@/lib/fakeData/brands.json";
import currs from "@/lib/fakeData/currencies.json";
import cases from "@/lib/fakeData/status.json";
import { generateYears } from "@/lib/utils/staff";
import { AddCarProps } from "@/lib/types/addCarProps";
import MobileInput from "@/lib/components/controls/mobileInput";
import { toast } from "react-toastify";
import { CarContext } from "@/lib/contexts/carContext";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";


const modelYears  = cache(()=>generateYears(2000)?.map<DropdownItemProps>(e=>({text:e.toString(),value:e.toString()})).toReversed());
type AddCarsErrorProps = {
    brandError?:string,
    modelError?:string,
    nameError?:string,
    priceError?:string,
    currencyError?:string,
    sallerNameError?:string,
    mobileNoError?:string,
    addressError?:string
   };
export default function AddCarPage() {

    const [brandOptions] = useState<DropdownItemProps[] | []>(brands);
    const [models] = useState<DropdownItemProps[] | [] | undefined >(modelYears);
    const [currencies] =  useState<DropdownItemProps[] | [] >(currs);
    const [addRequest,setAddRequest] = useState<AddCarProps>({
        id:0,
        name:'',
        brand:null,
        model:null,
        price : null,
        saller: null,
        status : null,
    });
    const mainImgRef = useRef<FileUpload>(null);
    const extraImgRef = useRef<FileUpload>(null);
    const [requestErrors,setRequestErrors] = useState<AddCarsErrorProps | undefined >(undefined);
    //------------------------------------------------------------------------------------------------------
    const handleAddRequest = ()=>{

       

       const _brandError = z.string({message:"Field is required."}).min(1).safeParse(addRequest?.brand?.name);
       let _errors : AddCarsErrorProps = {};
       if(!_brandError.success){
        _errors.brandError = JSON.parse(_brandError.error.message)[0]?.message;
       }else{
        _errors.brandError = undefined;
        delete _errors.brandError;
       }
       //----------------------------------------------------------
       const _modelError = z.string({message:"Field is required."}).min(1).safeParse(addRequest?.model?.year);
       if(!_modelError.success){
        _errors.modelError = JSON.parse(_modelError.error.message)[0]?.message;
       }else{
       _errors.modelError = undefined;
       delete _errors.modelError;
       }
       //-----------------------------------------------------------
       const _nameError = z.string().min(1,{message:"Field is required."}).safeParse(addRequest?.name);
       if(!_nameError.success){
        _errors.nameError = JSON.parse(_nameError.error.message)[0]?.message;
       }else{
        _errors.nameError = undefined;
        delete _errors.nameError;
       }
        //-----------------------------------------------------------
        const _priceError = z.number({message:"Field is required."})
        .min(1,{message:'Price not accepted'})
        .safeParse(addRequest?.price?.price);
        if(!_priceError.success){
        _errors.priceError = JSON.parse(_priceError.error.message)[0]?.message;
        }else{
        _errors.priceError = undefined;
        delete _errors.priceError;

        }
        //------------------------------------------------------------
        const _currError = z.string({message:"Field is required."})
        .min(1)
        .safeParse(addRequest?.price?.currency);
        if(!_currError.success){
        _errors.currencyError = JSON.parse(_currError.error.message)[0]?.message;
        }else{
        _errors.currencyError = undefined;
        delete _errors.currencyError;

        }
        //------------------------------------------------------------
        const _sallerNameError = z.string({message:"Field is required."})
        .min(1,{message:"Field is required."})
        .safeParse(addRequest?.saller?.name);
        if(!_sallerNameError.success){
        _errors.sallerNameError = JSON.parse(_sallerNameError.error.message)[0]?.message;
        }else{
        _errors.sallerNameError = undefined;
        delete  _errors.sallerNameError;
        }
        //------------------------------------------------------------
        const _sallerMobileNoError = z.string({message:"Field is required."})
        .min(13,{message:"Mobile no is invalid."})
        .safeParse(addRequest?.saller?.phoneNumber);
        if(!_sallerMobileNoError.success){
        _errors.mobileNoError = JSON.parse(_sallerMobileNoError.error.message)[0]?.message;
        }else{
        _errors.mobileNoError = undefined;
        delete  _errors.mobileNoError;
        }
       setRequestErrors(_errors);

       
        if(Object.keys(_errors).length != 0)
        return;

        if(!addRequest.status){
            toast.error("Choose the status of your car.");
            return;
        }

        if(mainImgRef.current?.getFiles().length == 0){
            toast.error("Choose main image of your car.");
            return;
        }

        const alts = extraImgRef.current?.getFiles();
        if(alts && alts?.length > 5){
            toast.error("Can't upload more than 5 images for you car.");
            return;
        }
        
        // just for test
        toast.success("Added was successfully");
    }

    return (
        <Container>
            <Section
                title="Add new car"
                subTitle="From here you can add car to the avaliable car's list."
            />
            <SectionForm
                title="car's data"
                titleDecoration
                titleDecorationColor="primary"
            >
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                    <CustomDropdown
                        options={brandOptions}
                        placeholder="Choose brand"
                        name="brand"
                        title="Brand"
                        isRequired
                        error={requestErrors?.brandError}
                        onChange={(event) => {
                            setAddRequest({...addRequest,brand:{name:event.value}})
                        }}
                    />
                    <CustomDropdown
                        options={models}
                        placeholder="Choose model"
                        name="model"
                        title="Model"
                        isRequired
                        error={requestErrors?.modelError}
                        onChange={(event) => {
                            setAddRequest({...addRequest,model:{year:event.value}})

                        }}
                    />
                    <InputValue
                        label="Name"
                        name="name"
                        isRequired
                        error={requestErrors?.nameError}
                        onInput={(value) => {
                            setAddRequest({...addRequest,name:value.currentTarget.value})
                        }}
                    />

                    <CarStatusRadioGroup
                        values={cases}
                        title="Car's status"
                        name="status"
                        onChange={(value) => {
                            setAddRequest({...addRequest,status:value });
                        }}
                    />
                    <InputValue
                        label="Price"
                        name="price"
                        isRequired
                        type="number"
                        error={requestErrors?.priceError}
                        onInput={(value) => {
                            if(!isNaN(parseFloat(value.currentTarget.value))){
                                setAddRequest({...addRequest, price:{price: parseFloat(value.currentTarget.value),
                                    currency : addRequest?.price?.currency ?? 'USD'}});
                            }else{
                            setAddRequest({...addRequest, price:{price: 0,
                                currency : addRequest?.price?.currency ?? 'USD'}});
                            }
                        }}
                    />
                    <CustomDropdown
                        placeholder="Choose currency"
                        options={currencies}
                        name="currency"
                        title="Currency"
                        isRequired
                        error={requestErrors?.currencyError}
                        onChange={(event) => {
                            setAddRequest({...addRequest, price:{price: addRequest?.price?.price ?? 0,
                                currency : event.value}});
                        }}
                    />
                </div>
                <Divider />
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                    <FileUpload ref={mainImgRef} maxFileSize={1000000} mode="basic" name="demo[]" chooseLabel="Main Car's image" accept="image/*" />
                    <FileUpload ref={extraImgRef} maxFileSize={1000000}  mode="basic" name="demo[]" multiple chooseLabel="Upload images" accept="image/*" />
                </div>
            </SectionForm>
            <div className="my-10" />
            <SectionForm
                title="saller's data"
                titleDecoration
                titleDecorationColor="primary"
            >
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                    <InputValue
                        label="FullName"
                        name="fullname"
                        isRequired
                        error={requestErrors?.sallerNameError}
                        onInput={(value) => {
                            setAddRequest({...addRequest,saller:{
                                 ...addRequest.saller,
                                 id:0,
                                 name : value.currentTarget.value}})
                        }}
                    />

                    <MobileInput
                        label="Mobile No"
                        name="mobileNo"
                        isRequired
                        defaultValue={addRequest?.saller?.phoneNumber}
                        error={requestErrors?.mobileNoError}
                        onChange={(value) => {
                            console.log (value.value);
                            setAddRequest({...addRequest,saller:{
                                ...addRequest.saller,
                                id:0,
                                name:addRequest.saller?.name ?? '',
                                phoneNumber : value.value ?? ''}})
                        }}
                    />

                    <div className=" col-span-2 ">
                        <InputValue
                            label="Address"
                            name="address"
                            error={requestErrors?.addressError}
                            onInput={(value) => {
                                setAddRequest({...addRequest,saller:{
                                    ...addRequest.saller,
                                    id:0,
                                    name:addRequest.saller?.name ?? '',
                                    address : value.currentTarget.value}})
                            }}
                        />
                    </div>
                </div>
            </SectionForm>
            <div className="mt-5" />
            <Button onClick={handleAddRequest}>
              Save
            </Button>
            <div className="mb-20" />

        </Container>
    )
}