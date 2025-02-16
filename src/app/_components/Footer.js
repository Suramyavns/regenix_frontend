'use client'
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa"
import { FaClipboardList } from "react-icons/fa6"
import { IoMdSettings } from "react-icons/io"
import { MdManageAccounts } from "react-icons/md"

export default function Footer(){
    const icontw = 24;
    const paths = [
        {path: '/home/dashboard',icon:<FaHome size={icontw}/>},
        {path: '/home/tasks', icon:<FaClipboardList size={icontw}/>},
        {path: '/home/profile', icon:<MdManageAccounts size={icontw}/>},
        {path: '/home/settings', icon:<IoMdSettings size={icontw}/>},
    ]
    return(
        <div className="w-full border-t bg-gray-600 sticky z-10 bottom-0 left-0 p-2 flex justify-evenly items-center">
            {
                paths.map((path,index)=>{
                    const pathname = usePathname();
                    return(
                        <a className={`${pathname===path.path?'bg-gray-800':''} p-2 rounded-full`} href={path.path} key={index}>
                            {path.icon}
                        </a>
                    )
                })
            }
        </div>
    )
}