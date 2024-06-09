export default function Section({
    title,
    subTitle,
    bottomSize = 'lg'
}:{
    title:string,
    subTitle?:string | undefined,
    bottomSize? :'lg' | 'xl' 
}){
    return( <section className={`flex flex-col gap-2 ${bottomSize === 'lg' ? 'mb-5' :'mb-10'}`}>
        <h2 className=" text-2xl font-bold capitalize border-s-4 border-solid px-2  border-wowPrimary text-wowPrimary">{title}</h2>
        {subTitle && <p className=" text-wowGray">{subTitle}</p>} 
    </section>)
}