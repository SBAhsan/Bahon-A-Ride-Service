import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ICreateUser } from "./user.interface";
import { config } from "../../config";

const registerUserInDB = async (payload: ICreateUser) => {
    const {name, email, phone, password} = payload;

    const doUserExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(doUserExist){
        throw new Error ("User already exists")
    }

    const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            phone,
            password: hashPassword,
            role: payload.role
        }
    })


    const user = await prisma.user.findUnique({
        where: {
            phone: createdUser.phone || phone,
            email: createdUser.email || email
        },

        omit: {
            password: true
        }
    });

    return user;
}


export const userService = {
    registerUserInDB
}