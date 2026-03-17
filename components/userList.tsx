"use client";

import { use, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Link from "next/link";
import { useWindowWidth } from "../app/hooks/useWindowWidth";
import { UserListProps, Users } from "../services/types";
import Image from "next/image";
import { makeUser } from "../app/__tests__/fixtures";
import { deleteUser } from "../services/user-service";


export default function Userlist({ users: initialUsers }: UserListProps) {
  const [userData, setUserData] = useState<Users | null>();
  const [users, setUsers] = useState(initialUsers);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const isMobile = useWindowWidth();
  console.log(isMobile, "width");

  const handleDeleteUser = async (userId: number, userName: string) => {
    if (confirm(`Are you sure you want to delete ${userName}?`)) {
      setDeletingId(userId);
      try {
        const result = await deleteUser(userId);
        if (result.success) {
          setUsers(users.filter(u => u.id !== userId));
          if (userData?.id === userId) {
            setUserData(null);
          }
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        alert("Error deleting user");
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (users && users.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <div className="flex gap-5 justify-between p-5 ">
      <div>
        {users &&
          users.map((user) => {
            const content = (
              <div className="flex flex-row items-center gap-2.5 p-2 cursor-pointer bg-violet-200 mt-3 rounded-2xl" onClick={() => setUserData(user)}>
                <div className="mr -2">
                  <Image
                    src={user.image}
                    alt={user.firstName}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p
                 
                    className="bg-grey-100 mt-1.5 text-black mb-1 font-bold"
                  >
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm font">{user.email}</p>
                </div>
              </div>
            );

            if (isMobile) {
              return (
                <Link key={user.id} href={`/user/${user.id}`}>
                  {content}
                </Link>
              );
            }
            return (
              <div
                key={user.id}
              >
                {content}
              </div>
            );
          })}
      </div>
      {userData && !isMobile && <Sidebar user={userData} onDeleteUser={handleDeleteUser} onUserDeleted={() => setUserData(null)} />}
    </div>
  );
}
