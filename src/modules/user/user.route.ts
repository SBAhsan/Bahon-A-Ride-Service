import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post('/register', userController.registerUser);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getSingleUser)

export const userRoute = router;