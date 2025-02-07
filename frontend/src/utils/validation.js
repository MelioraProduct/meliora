export const validateName = (name) => {
  if (!name) return "Name is required.";
  if (/^[^a-zA-Z]/.test(name)) return "Name must start with alphabets only.";
  if (name.length < 3) return "Name must be at least 3 characters long.";
  if (/[^a-zA-Z\s]/.test(name))
    return "Name must contain only alphabets and spaces.";
  return "";
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) return "Email is required.";
  if (!emailRegex.test(email)) return "Invalid email format.";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required.";
  if (password.length < 6)
    return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter.";
  if (!/[0-9]/.test(password))
    return "Password must contain at least one number.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return "Password must contain at least one special character.";
  return "";
};
