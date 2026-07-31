import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post('/register', userController.registerUser);

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getSingleUser);

router.patch('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser)

export const userRoute = router;