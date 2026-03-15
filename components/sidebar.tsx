import Image from "next/image";
import { SidebarProps, Users } from "../services/types";
import RenderUsers from "./renderList";

export default function Sidebar({user} : SidebarProps){
    return(
        <div className="border-1 p-5 w-1/2 h-[80vh] overflow-scroll fixed right-2.5 rounded-lg bg-purple-100 shadow-md">
            <h1 className="text-gray-500 font-bold text-2xl">User Details</h1>
            {user?.image && 
             <Image src={user && user?.image || null} alt={user && user.image} width={100} height={100} loading="lazy" />
            }
           {RenderUsers(user)}
        </div>
    )
}
