import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "../assets/font/font";

export const Logo = () => {
    return(
        <div className={`${lusitana.className} flex flex-row items-center leading-none text-white`}>
            <GlobeAltIcon className="h-12 w-12 rotate-[15deg]">
                <p className="text-[44px]">Logo</p>
            </GlobeAltIcon>
        </div>
    )
}