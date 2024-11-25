import bcrypt from 'bcryptjs';

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => await bcrypt.compare(password, hashedPassword);
