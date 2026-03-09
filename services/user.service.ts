import { AllUsersResponse, Users } from "./types";


export async function getUserDetails(id: string): Promise<Users> {
  try {
    const res: Response = await fetch(`http://localhost:3000/api/users/${id}`, {
      cache: "no-store",
    });
    console.log("User details response:", res);

    if (res.status == 400) {
      throw new Error(
        "User not found. Please check the user ID and try again.",
      );
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}

  export async function getAllUsers(): Promise<AllUsersResponse> {
  try {
    const res: Response = await fetch(`http://localhost:3000/api/getUsersList`);
    if (!res.ok) {
      return { success: false, error: "Failed to fetch users" };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return {
      success: false,
      error: "An unexpected error occurred while fetching users",
    };
  }
}

// export async function getUserDetails(id: string): Promise<Users> {
//   try {
//     const res: Response = await fetch(`https://dummyjson.com/users/${id}`, {
//       cache: "no-store",
//     });
//     console.log("User details response:", res);

//     if (res.status == 400) {
//       throw new Error(
//         "User not found. Please check the user ID and try again.",
//       );
//     }
//     const data: Users = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     throw error;
//   }
// }

//   export async function getAllUsers(): Promise<AllUsersResponse> {
//   try {
//     const res: Response = await fetch(`https://dummyjson.com/users`);
//     if (!res.ok) {
//       return { success: false, error: "Failed to fetch users" };
//     }
//     const data = await res.json();
//     return { success: true, data: data };
//   } catch (error) {
//     console.error("Error fetching all users:", error);
//     return {
//       success: false,
//       error: "An unexpected error occurred while fetching users",
//     };
//   }
// }


