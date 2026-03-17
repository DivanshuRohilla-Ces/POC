"use client";

import { Users } from "../services/types";
import { useState } from "react";
import { deleteUser } from "../services/user-service";
import { useRouter } from "next/navigation";

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

// Client component for rendering user data with delete button
export default function RenderUsers({ user }: { user: Users }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      setIsDeleting(true);
      try {
        const result = await deleteUser(user.id);
        if (result.success) {
          router.push("/");
        } else {
          alert("Failed to delete user");
          setIsDeleting(false);
        }
      } catch (error) {
        alert("Error deleting user");
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {RenderUserData(user)}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isDeleting ? "Deleting..." : "Delete User"}
      </button>
    </div>
  );
}
