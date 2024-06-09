import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppProvider from "@/lib/providers/primerProvider";
import Navbar from "@/lib/components/navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import 'primereact/resources/themes/tailwind-light/theme.css';
import CarProvider from "@/lib/providers/carProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wow Cars",
  description: "Wow Cars website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen w-full  ${inter.className} `}>
        <AppProvider>
          <Navbar />
          <CarProvider>
           {children}
          </CarProvider>
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnHover
            theme="light"
          />
        </AppProvider>
      </body>
    </html>
  );
}
