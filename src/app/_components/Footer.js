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
        <div className="w-full border-t border-black dark:border-white dark:bg-gray-600 sticky z-10 bottom-0 left-0 p-2 flex justify-evenly sm:justify-center sm:gap-6 items-center">
            {
                paths.map((path,index)=>{
                    const pathname = usePathname();
                    return(
                        <a className={`${pathname===path.path?'bg-yellow-50 dark:bg-gray-800':''} p-2 rounded-full flex justify-center items-center flex-col sm:rounded-lg`} href={path.path} key={index}>
                            {path.icon}
                            <p className="text-sm hidden sm:block">
                                {path.path.slice(6,path.path.length).toLocaleUpperCase()}
                            </p>
                        </a>
                    )
                })
            }
        </div>
    )
}