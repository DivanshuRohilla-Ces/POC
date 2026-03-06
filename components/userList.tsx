"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Link from "next/link";
import { useWindowWidth } from "../app/hooks/useWindowWidth";
import { UserListProps, Users } from "../app/types";


export default function Userlist({ users } : UserListProps) {
  const [userData, setUserData] = useState<Users | null>();
  const isMobile  = useWindowWidth();
  console.log(isMobile, "width");
  return (
    <div className="flex gap-5 justify-between p-5 ">
     
<div>
      {users && users.map((user) => {
        const content = (
          <p
            onClick={() => setUserData(user)}
            className="p-1 cursor-pointer bg-grey-100 mt-1.5 text-black border-2 mb-1"
          >
            {user.firstName} {user.lastName}
          </p>
        );

        if (isMobile) {
          return (
            <Link key={user.id} href={`/user?userId=${user.id}`}>
              {content}
            </Link>
          );
        }
        return (
          <div key={user.id}>
            {content}
          </div>
        );
      })}
    </div>
      {userData && !isMobile &&  <Sidebar user={userData} />}
    </div>
  );
}
