import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const registerUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await userService.registerUserInDB(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "You registered successfully",
        data: user
    })
});


const getAllUsers = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getAllUserFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Retrieved all users successfully",
        data: result
    })
});


const getSingleUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    console.log("The user id is: ",userId);

    const result = await userService.getSingleUserFromDB(userId as string);


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User retrieved successfully",
        data: result
    })
});


const updateUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const payload = req.body;

    const result = await userService.updateUserInDB(userId as string, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User updated successfully",
        data: result
    })
});


const deleteUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    const result = await userService.deleteUserFromDB(userId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User deleted successfully",
        data: {}
    })
})

export const userController = {
    registerUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}