import Link from "next/link";
import { routes } from "../utils/routes";
export default function Navbar(){
    return (<nav className="h-[4rem] bg-wowPrimary w-full flex flex-row items-center px-5 fixed z-10 ">
        <ul className="list-none flex flex-row gap-10 text-white text-lg">
           {
                routes.map(e=>(<li key={e.key} className="transition-all duration-150 hover:font-bold hover:scale-[1.2] ">
                    <Link  href={e.route}>{e.title}</Link>
                </li>))
            }
        </ul>
    </nav>)
}