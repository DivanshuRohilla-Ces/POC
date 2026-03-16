import { AllUsersResponse, Users } from "./types";

const API_BASE_URL = "http://localhost:3000/api";

export async function getUserDetails(id: string): Promise<Users> {
  try {
    const res: Response = await fetch(`${API_BASE_URL}/user/${id}`, {
      cache: "no-store",
    });
    console.log("User details response:", res);

    if (res.status == 400) {
      throw new Error(
        "User not found. Please check the user ID and try again.",
      );
    }
    const response = await res.json();
    if (!response) {
      throw new Error("Invalid response from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}

  export async function getAllUsers(): Promise<AllUsersResponse> {
  try {
    const res: Response = await fetch(`${API_BASE_URL}/users`);
    if (!res.ok) {
      return { success: false, error: "Failed to fetch users" };
    }

    const response = await res.json();
    if (!response) {
      return { success: false, error: "Invalid response from server" };
    }
    return response;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return {
      success: false,
      error: "An unexpected error occurred while fetching users",
    };
  }
}
