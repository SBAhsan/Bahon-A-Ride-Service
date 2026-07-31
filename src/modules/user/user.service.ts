import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ICreateUser, IUpdateUser } from "./user.interface";
import { config } from "../../config";

const registerUserInDB = async (payload: ICreateUser) => {
  const { name, email, phone, password } = payload;

  const doUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (doUserExist) {
    throw new Error("User already exists");
  }

  const hashPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashPassword,
      role: payload.role,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      phone: createdUser.phone || phone,
      email: createdUser.email || email,
    },

    omit: {
      password: true,
    },
  });

  return user;
};

const getAllUserFromDB = async () => {
  const result = await prisma.user.findMany({
    omit: {
      password: true,
    },
  });

  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });

  return result;
};

const updateUserInDB = async (userId: string, payload: IUpdateUser) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...payload,
    },
    omit: {
        password: true
    }
  });

  console.log("The result is: ", result);

  return result;
};

const deleteUserFromDB = async(userId: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    });

    const result = await prisma.user.delete({
        where: {
            id: userId
        }
    });

    return result;
}

export const userService = {
  registerUserInDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB
};
