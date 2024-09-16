import * as Yup from "yup";

export const nameSchema = Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(40, "Name must be less than 40 characters");

export const emailSchema = Yup.string()
    .required("Email is required")
    .email("Invalid email format");

export const passwordSchema = Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number");

export const phoneSchema = Yup.string().matches(
    /^\d{10}$/,
    "Phone number must be 10 digits"
);
