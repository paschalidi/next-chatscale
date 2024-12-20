import bcrypt from 'bcryptjs'

export const saltAndHashPassword = async (password: string): Promise<string> => {
  // Cost factor of 12 is a good balance between security and performance
  const salt = await bcrypt.genSalt(12)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

// Optional verification function
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}