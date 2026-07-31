export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

export const isValidPassword = (password) => password.length >= 6;

export const doPasswordsMatch = (password, confirmPassword) => password === confirmPassword;

export const isValidOtp = (otp) => /^\d{6}$/.test(otp);