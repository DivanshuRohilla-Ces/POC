"use client";

import { Users } from "../services/types";
import { useState } from "react";
import { deleteUser } from "../services/user-service";

function RenderUserData(obj: Users) {
  return Object.entries(obj).map(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      return (
        <div key={key} className="ml-2.5 w-1/2">
          <strong>{key}:</strong>
          {RenderUserData(value)}
        </div>
      );
    }

    return (
      <p key={key}>
        <strong>{key}:</strong> {String(value)}
      </p>
    );
  });
}

interface RenderUsersWithDeleteProps {
  user: Users;
  showDeleteButton?: boolean;
  onUserDeleted?: () => void;
  onDeleteUser?: (userId: number, userName: string) => void;
}

// Client component for rendering user data with optional delete button
export default function RenderUsersWithDelete({ user, showDeleteButton = false, onUserDeleted, onDeleteUser }: RenderUsersWithDeleteProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const userName = `${user.firstName} ${user.lastName}`;
    
    if (onDeleteUser) {
      // Use callback from parent (userList) which handles state update
      setIsDeleting(true);
      await onDeleteUser(user.id, userName);
      setIsDeleting(false);
    } else {
      // Fallback: call deleteUser directly
      if (confirm(`Are you sure you want to delete ${userName}?`)) {
        setIsDeleting(true);
        try {
          const result = await deleteUser(user.id);
          if (result.success) {
            onUserDeleted?.();
          } else {
            alert("Failed to delete user");
          }
        } catch (error) {
          alert("Error deleting user");
        } finally {
          setIsDeleting(false);
        }
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        {RenderUserData(user)}
      </div>
      {showDeleteButton && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isDeleting ? "Deleting..." : "Delete User"}
        </button>
      )}
    </div>
  );
}
