import { UserRole } from "../../../prisma/generated/prisma/enums";

export interface ICreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: UserRole;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: UserRole;
}
