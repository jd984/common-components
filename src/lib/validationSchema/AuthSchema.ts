import * as Yup from "yup";
import YupPassword from "yup-password";
import { emailRegExp } from "@/lib/helper";
YupPassword(Yup);

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .typeError("First name is invalid")
    .required("First name is required")
    .min(2, "A minimum of 2 characters is required")
    .max(30, "A maximum of 30 characters is allowed"),
  lastName: Yup.string()
    .trim()
    .typeError("Last name is invalid")
    .required("Last name is required")
    .min(2, "A minimum of 2 characters is required")
    .max(30, "A maximum of 30 characters is allowed"),
  email: Yup.string()
    .required("Email address is required")
    .email("Valid email address is required")
    .min(5, "A minimum of 5 characters is required")
    .max(100, "A maximum of 100 characters is allowed")
    .matches(emailRegExp, "Email must be in a valid format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters long")
    .max(64, "Password cannot be longer than 64 characters")
    .matches(/(?=.*[a-z])/, "Password must contain at least 1 lowercase letter")
    .matches(/(?=.*[A-Z])/, "Password must contain at least 1 uppercase letter")
    .matches(/(?=.*\d)/, "Password must contain at least 1 number")
    .matches(/(?=.*[@$!%*?&])/, "Password must contain at least 1 symbol"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email address is required")
    .email("Email address is required")
    .min(5, "A minimum of 5 characters is required")
    .max(100, "A maximum of 100 characters is allowed")
    .matches(emailRegExp, "Email must be in a valid format"),
  password: Yup.string()
    .required("Password is required")
    .password()
    .minLowercase(1, "Password must contain at least 1 lowercase letter")
    .minUppercase(1, "Password must contain at least 1 uppercase letter")
    .minNumbers(1, "Password must contain at least 1 number")
    .minSymbols(1, "Password must contain at least 1 symbol")
    .min(8, "Password must contain at least 8 characters long")
    .max(64, "Password cannot be longer than 64 characters"),
});
