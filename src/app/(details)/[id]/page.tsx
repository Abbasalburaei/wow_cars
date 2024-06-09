"use client";
import CarCard from "@/lib/components/carCard";
import Container from "@/lib/components/container";
import Section from "@/lib/components/section";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Galleria } from "primereact/galleria";
import { Tag } from "primereact/tag";
import { useContext, useEffect, useState } from "react";
import "react-chat-elements/dist/main.css"
import ChatBox from "@/lib/components/chatBox";
import { notFound, useParams } from "next/navigation";
import { CarContext } from "@/lib/contexts/carContext";
import { CarProps } from "@/lib/types/carProps";
import { getBrandImagePath } from "@/lib/utils/staff";



export default function CarDetailsPage() {
    const { cars } = useContext(CarContext);
    const { id } = useParams();
    //--------------------------------------------------------
    const [copyCodeTooltip, setCopyCodeTooltip] = useState(0);
    const [carDetails, setCarDetails] = useState<CarProps | undefined>(undefined);
    const [imgs,setImgs] = useState<{}[]>();
    //--------------------------------------------------------
    if (cars.filter(e => e.id.toString() == id)?.length == 0)
        return notFound();



    useEffect(() => {
        const details =  cars.find(e => e.id.toString() == id) ?? undefined;
        setCarDetails(details);
        if(details){
            let mapperImgs :{} [] = [{
            itemImageSrc: details?.mainImgPath,
            thumbnailImageSrc: details?.mainImgPath,
            alt: carDetails?.name,
            title: carDetails?.name
            }];
            

            const altImgs = details?.altImgs?.map(e => (
                {
                itemImageSrc: e,
                thumbnailImageSrc: e,
                alt: carDetails?.name,
                title: carDetails?.name
                }
                ));

                if(altImgs && altImgs?.length > 0){
                    for(let item of altImgs){
                       mapperImgs.push(item); 
                    }
                }

            setImgs(mapperImgs);
        }
    }, [id]);


    const itemTemplate = (item: any) => {
        return <img src={item.itemImageSrc} alt={item.alt} className=" object-contain  md:max-w-[40rem] md:min-w-[40rem]" />;
    };
    return (
        <div className="relative">
            <div className="grid   md:grid-cols-2 grid-cols-1 pt-32 px-10 pb-5  gap-4 bg-wowSecondary min-h-[40rem] overflow-x-hidden overflow-hidden">
                <div className=" flex flex-col h-full">
                    <div className="text-white inline-flex flex-row sm:w-[40%] items-center  w-[60%] border-t-4 border-wowBlack">
                        <div className="relative left-0 top-0 flex h-10 w-12 rounded-b-md bg-wowBlack justify-center items-center">
                            <Image
                                alt={carDetails?.name ?? ''}
                                className="px-2"
                                src={getBrandImagePath(carDetails?.brand)}
                                objectFit='contain'
                                objectPosition="center"
                                layout="fill"
                            />
                        </div>
                        <span className=" text-xl capitalize mx-2">
                            {carDetails?.brand?.name}
                        </span>
                    </div>
                    <div className="mt-10" />
                    <div className="flex flex-col gap-2">
                        <div>
                            <Button onMouseLeave={() => {
                                setCopyCodeTooltip(0)
                            }} onClick={() => {
                                setCopyCodeTooltip(1)
                                navigator.clipboard.writeText(window.location.href)
                            }} tooltip={copyCodeTooltip == 0 ? 'Copy link' : 'Copied successfully'} className="copy-done bg-wowBlack">
                                <FontAwesomeIcon icon={faShareAlt} />
                            </Button>
                        </div>
                        <h2 className="text-white sm:text-3xl font-bold text-2xl">{carDetails?.name}</h2>
                        <div className="inline-flex flex-row gap-5 flex-wrap">
                            <div className="flex flex-row items-center gap-2">
                                <span className="text-md text-white">Model</span>
                                <Tag className="bg-wowBlack capitalize">{carDetails?.model?.year}</Tag>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <span className="text-md text-white">Status</span>
                                <Tag className="bg-wowPrimary capitalize">{carDetails?.status}</Tag>
                            </div>
                        </div>
                        <Divider className="w-20" />
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center justify-between gap-5 flex-wrap">
                                <span className="font-bold text-2xl text-white capitalize">Price</span>
                                <span className="font-bold text-2xl capitalize text-wowPrimary">{carDetails?.price?.price}{carDetails?.price?.currency}</span>
                            </div>
                            <div className="flex flex-row items-center justify-between gap-5 flex-wrap">
                                <span className="font-bold text-2xl text-white capitalize">Saller</span>
                                <span className="font-bold capitalize text-wowPrimary">{carDetails?.saller?.name}</span>
                            </div>
                            <div className="flex flex-row items-center justify-between gap-5 flex-wrap">
                                <span className="font-bold text-2xl text-white capitalize">MobileNo</span>
                                <span className="capitalize text-wowPrimary">{carDetails?.saller?.phoneNumber}</span>
                            </div>
                            <div className="flex flex-row items-center justify-between gap-5 flex-wrap">
                                <span className="font-bold text-2xl text-white capitalize">Address</span>
                                <span className=" capitalize text-wowPrimary">{carDetails?.saller?.address}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full flex flex-col gap-5 items-center w-full  justify-center">
                    <Galleria value={imgs} style={{ maxWidth: 'auto' }}
                    showThumbnails={false}
                    showIndicators item={itemTemplate} />

                </div>

            </div>
            <Container>
                <div className="flex flex-col my-10">
                    <Section title="Avaliable saller's cars"
                        subTitle="Saller has more than one cars to sale"
                    />
                    <div className="flex flex-row flex-wrap gap-5">
                        {
                            cars?.filter(e=>e.saller?.id == carDetails?.saller?.id)
                                ?.map((e, index) => (
                                <CarCard
                                    id={e.id}
                                    name={e.name}
                                    model={e?.model?.year}
                                    status={e?.status}
                                    price={e?.price?.price}
                                    currency={e?.price?.currency}
                                    brand={e?.brand}
                                    sallerName={e?.saller?.name ?? ''}
                                    imgPath={e?.mainImgPath ?? ''}
                                />
                            ))
                        }
                    </div>
                    <div className="my-10" />
                    <Section title="Another avaliable cars with same brand"
                    />
                    <div className="flex flex-row flex-wrap gap-5">
                        {
                                   cars?.filter(e=>e.brand?.name == carDetails?.brand?.name)
                                   ?.map((e, index) => (
                                   <CarCard
                                       id={e.id}
                                       name={e.name}
                                       model={e?.model?.year}
                                       status={e?.status}
                                       price={e?.price?.price}
                                       currency={e?.price?.currency}
                                       brand={e?.brand}
                                       sallerName={e?.saller?.name ?? ''}
                                       imgPath={e?.mainImgPath ?? ''}
                                   />
                               ))
                        }
                    </div>
                </div>
            </Container>
            <ChatBox  
            senderName="Abbas Alburaee"
            sallerName={carDetails?.saller?.name ?? ''} 
            />
        </div>
    )
}