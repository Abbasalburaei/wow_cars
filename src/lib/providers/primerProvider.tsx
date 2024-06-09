"use client";
import { PrimeReactProvider} from 'primereact/api';
export default function AppProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (<PrimeReactProvider>
             {children}
         </PrimeReactProvider>)
}