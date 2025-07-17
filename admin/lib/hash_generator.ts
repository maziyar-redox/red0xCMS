import { hashSync } from "bcryptjs";

export default function hashPassword(password: string): string {
    const saltRounds = 10;
    const hashedPassword = hashSync(password, saltRounds);
    return hashedPassword;
};