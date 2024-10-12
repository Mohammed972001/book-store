import sendEmail from "../utils/sendEmail.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  await sendEmail(
    email,
    "Verify your email",
    VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
  );
};

export const sendWelcomeEmail = async (email, name) => {};

export const sendPasswordResetEmail = async (email, resetURL) => {
  await sendEmail(
    email,
    "Reset your password",
    PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
  );
};

export const sendResetSuccessEmail = async (email) => {
  await sendEmail(
    email,
    "Password Reset Successful",
    PASSWORD_RESET_SUCCESS_TEMPLATE
  );
};
