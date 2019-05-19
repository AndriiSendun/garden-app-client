export const requirePassword = value =>
  value ? undefined : "Please enter your password";

export const requireEmail = value =>
  value ? undefined : "Please enter your email address";

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
