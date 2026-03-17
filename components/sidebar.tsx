import Image from "next/image";
import { SidebarProps, Users } from "../services/types";
import RenderUsersWithDelete from "./renderUserWithDelete";

export default function Sidebar({user, onDeleteUser, onUserDeleted} : SidebarProps & {onDeleteUser?: (userId: number, userName: string) => void, onUserDeleted?: () => void}){
    return(
        <div className="border-1 p-5 w-1/2 h-[80vh] overflow-scroll fixed right-2.5 rounded-lg bg-purple-100 shadow-md flex flex-col">
            <div className="flex-1 overflow-auto">
                <h1 className="text-gray-500 font-bold text-2xl">User Details</h1>
                {user?.image && 
                 <Image src={user && user?.image || null} alt={user && user.image} width={100} height={100} loading="lazy" />
                }
               <RenderUsersWithDelete user={user} showDeleteButton={!!onDeleteUser} onUserDeleted={onUserDeleted} onDeleteUser={onDeleteUser} />
            </div>
        </div>
    )
}
