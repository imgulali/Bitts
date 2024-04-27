import { object, string } from "yup";

export const SignUpSchema = object({
    name: string().required("Name is required"),
    email: string().required("Email is required").email("Invalid Email"),
    password: string().required("Password is required").min(6, "Password should be atleast of 6 digits"),
    confirmPass: string().required("Confirm Password is required"),
});

export const LoginSchema = object({
    email: string().required("Email is required").email("Invalid Email"),
    password: string().required("Password is required").min(6, "Password should be atleast of 6 digits"),
});

export const UpdateProfileSchema = object({
    name: string().min(1, "Name cannot be empty"),
    email: string().min(1, "Email cannot be empty").email("Invalid Email"),
    password: string().min(6, "Password should be atleast of 6 digits"),
});