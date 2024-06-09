"use client";
import { PropsWithChildren } from "react";
export default function SectionForm({
    title,
    titleDecoration = true,
    titleDecorationColor = 'default',
    children
}: PropsWithChildren<{
    title?: string,
    titleDecoration?: boolean
    titleDecorationColor?: 'primary' | 'secondary' | 'default' | 'black'
}>) {

    /**
     * format decoration colors based on root colors
     * @returns empty once no active parms else format color
     */
    const titleDecorationFormat = (): string => {

        if (titleDecoration == false || !titleDecorationColor)
            return '';
        let decorationColor = '';
        if (titleDecoration && titleDecorationColor) {
            const propValue = 'background-color:';
            switch (titleDecorationColor) {
                case 'black':
                    decorationColor = '--wow-balck-color';
                    break;
                case 'primary':
                    decorationColor = '--wow-primary-color';
                    break;
                case 'secondary':
                    decorationColor = '--wow-secondary-color';
                    break;
                case 'default':
                default:
                    decorationColor = '--wow-gray-color';
                    break;
            }
            return propValue.concat(`var(${decorationColor})`);
        }

        return '';
    };



    return (
        <>
            <style jsx>
                {
                    `

                    .sectionForm:after{  
                        content:'';
                        position: absolute;
                        height:5px;
                        width:50px;
                        bottom:-8px;
                        ${titleDecorationFormat()};          
                     }
                    `
                }
            </style>
            <div className="border border-wowLightGray p-5 bg rounded-md flex flex-col">

                <header className="mb-5 relative sectionForm">
                    <h3 className="font-bold text-xl capitalize ">{title}</h3>
                </header>
                {
                    children
                }
            </div>
        </>

    )
}