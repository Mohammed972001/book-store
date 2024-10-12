import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required.")
    .matches(/^\D+$/, "The name must contain only letters")
    .min(5, "Name should be at least 5 characters."),
  email: yup
    .string()
    .required("Email is required.")
    .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}/, "Not a valid email address."),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
      "Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters."
    ),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required.")
    .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}/, "Not a valid email address."),
  password: yup.string().required("Password is required."),
});
