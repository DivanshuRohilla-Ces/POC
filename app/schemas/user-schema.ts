import { z } from "zod";

type AddUserFormData = z.infer<typeof addUserSchema>;

const addUserSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(/^[A-Za-z]+$/, "First name should contain only letters")
    .min(2, "First name should be at least 2 characters long")
    .max(30, "First name should be less than 30 characters long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[A-Za-z]+$/, "Last name should contain only letters")
    .min(2, "Last name should be at least 2 characters long")
    .max(30, "Last name should be less than 30 characters long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  age: z
    .number()
    .min(18, "Age must be greater than 18")
    .max(60, "Age must be less than 60"),
  birthDate: z
    .string()
    .min(1, "Birth date is required")
    .refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      return age >= 18 && age <= 60;
    }, "Age calculated from birth date must be between 18 and 60"),
});

export { addUserSchema };