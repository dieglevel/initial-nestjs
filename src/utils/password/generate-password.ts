import * as bcrypt from "bcrypt";

export const generatePassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);
  return passwordHashed;
};
