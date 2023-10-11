import * as bcrypt from 'bcrypt';

export const hashPassword = async (rowPassword: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(rowPassword, salt);
};

export const comparePassword = async (
  rowPassword: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(rowPassword, hashedPassword);
};
