import bcrypt from 'bcryptjs';

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return password === hashedPassword;
};
