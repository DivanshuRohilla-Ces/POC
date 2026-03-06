import { notFound } from "next/navigation";

export async function getUserDetails(id: string) {
  try {
    const res = await fetch(`https://dummyjson.com/users/${id}`, {
      cache: "no-store",
    });
    console.log("User details response:", res);

    if (res.status == 400) {
      throw new Error(
        "User not found. Please check the user ID and try again.",
      );
    }
    if (res.status == 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
    // return {
    //   success: false,
    //   error: "An unexpected error occurred while fetching user details",
    // };
  }
}

export async function getAllUsers() {
  try {
    const res = await fetch(`https://dummyjson.com/users`);
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
