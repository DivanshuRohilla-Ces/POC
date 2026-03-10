import { notFound } from "next/navigation";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  image?: string;
  age?: number;
  [key: string]: any;
}

interface AllUsersResponse {
  success: boolean;
  error?: string;
  data?: { users: User[] };
}

interface ApiError extends Error {
  message: string;
}

export async function getUserDetails(id: string): Promise<User> {
  try {
    const res: Response = await fetch(`https://dummyjson.com/users/${id}`, {
      cache: "no-store",
    });
    console.log("User details response:", res);

    if (res.status == 400) {
      throw new Error(
        "User not found. Please check the user ID and try again.",
      );
    }
    const data: User = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}

export async function getAllUsers(): Promise<AllUsersResponse> {
  try {
    const res: Response = await fetch(`https://dummyjson.com/users`);
    if (!res.ok) {
      return { success: false, error: "Failed to fetch users" };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching all users:", error);
    return {
      success: false,
      error: "An unexpected error occurred while fetching users",
    };
  }
}
