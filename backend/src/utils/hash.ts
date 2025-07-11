import bcrypt from 'bcryptjs';

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (
  plain: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};
