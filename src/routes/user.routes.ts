import { Router } from "express";
import { container } from "tsyringe";
import { ValidateRequest } from "../middlewares/validateRequest.middleware";
import { userLoginBodySchema, userRegisterBodySchema } from "../schemas/user.schemas";
import { UserServices } from "../services/user.services";
import { UserControllers } from "../controllers/user.controllers";
import { ValidateToken } from "../middlewares/validateToken.middleware";
import { IsEmailAlreadyRegistered } from "../middlewares/isEmailAlreadyRegistered.middleware";

export const userRouter = Router();

container.registerSingleton('UserServices', UserServices);
const userControllers = container.resolve(UserControllers);

userRouter.post('/', IsEmailAlreadyRegistered.execute, ValidateRequest.execute({ body: userRegisterBodySchema }), (req, res) => userControllers.register(req, res));
userRouter.post('/login', ValidateRequest.execute({ body: userLoginBodySchema }), (req, res) => userControllers.login(req, res));
userRouter.get('/', ValidateToken.execute, (req, res) => userControllers.getUser(req, res));