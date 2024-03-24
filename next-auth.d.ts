import NextAuth, { DefaultSession } from "next-auth";
import { Gender, UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  gender: Gender;
  phoneNumber: string;
  dateOfBirth: Date;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
