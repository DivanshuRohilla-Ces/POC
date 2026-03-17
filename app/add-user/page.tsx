"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { addUser } from "@/services/user-service";
import { addUserSchema } from "../schemas/user-schema";

const AddUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const {
      register,
      handleSubmit,
      formState: { errors, touchedFields },
      reset,
    } = useForm({
      resolver: zodResolver(addUserSchema),
      mode: "all",
    });

    const onSubmit = async (data) => {
      setIsLoading(true);
      setSuccessMessage("");
      setErrorMessage("");
      
      try {
        const result = await addUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          age: data.age,
          birthDate: data.birthDate,
        });
        
        if (result.success) {
          setSuccessMessage("User added successfully!");
          reset();
          setTimeout(() => setSuccessMessage(""), 3000);
        } else {
          setErrorMessage(result.error || "Failed to add user");
        }
      } catch (error) {
        setErrorMessage("An error occurred while adding the user");
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="flex justify-center items-center min-h-screen p-2">
      <div className="flex flex-col gap-2.5 w-full lg:w-1/2">
        <h1 className="text-2xl font-bold mb-4">Add Details</h1>
        <form className="flex flex-col gap-2.5" onSubmit={handleSubmit(onSubmit)}>
          {successMessage && <div className="p-3 bg-green-100 text-green-800 rounded-md">{successMessage}</div>}
          {errorMessage && <div className="p-3 bg-red-100 text-red-800 rounded-md">{errorMessage}</div>}
          <input
            type="text"
            placeholder="First Name"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("firstName")}
          />
          {errors.firstName && touchedFields.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
          <input
            type="text"
            placeholder="Last Name"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("lastName")}
          />
          {errors.lastName && touchedFields.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
          <input
            type="email"
            placeholder="Email"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email")}
          />
          {errors.email && touchedFields.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <input
            type="number"
            placeholder="Age"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age && touchedFields.age && (
            <span className="text-red-500">{errors.age.message}</span>
          )}
          <input
            type="date"
            placeholder="Birth Date"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("birthDate")}
          />
          {errors.birthDate && touchedFields.birthDate && (
            <span className="text-red-500">{errors.birthDate.message}</span>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Adding User..." : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
