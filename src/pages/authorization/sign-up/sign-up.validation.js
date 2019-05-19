export const requirePassword = value =>
  value ? undefined : "Please enter your password";

export const repeatPassword = value =>
  value ? undefined : "Please repeat your password";

export const requireUserName = value =>
  value ? undefined : "Please enter your name";

export const requireEmail = value =>
  value ? undefined : "Please enter your email address";

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = min => value =>
  value && value.length < min
    ? `Must be more then ${min} characters`
    : undefined;

export const passwordsMatch = (value, allValue) =>
  value !== allValue.password ? "Passwords do not match" : undefined;

export const maxLength15 = maxLength(15);
export const minLength6 = minLength(6);
