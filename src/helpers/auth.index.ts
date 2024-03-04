
// passwordUtils.ts
import bcrypt from "bcrypt";
import crypto from "crypto";

export function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}


export function comparePassword(password: string, hashedPassword: string): boolean {

  return bcrypt.compareSync(password, hashedPassword);
}


export function generateAuthToken(userId: string): string {
  return ` ${crypto.createHash('sha256').update(`${userId}:${Date.now()}`).digest('hex')}`;
}

