import * as bcrypt from 'bcrypt';

export const hashPassword = async (rowPassword: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(rowPassword, salt);
};
