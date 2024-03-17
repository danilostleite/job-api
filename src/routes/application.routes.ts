import { Router } from "express";
import { ApplicationControllers } from "../controllers/application.controllers";
import { ValidateRequest } from "../middlewares/validateRequest.middleware";
import { applicationCreateSchema } from "../schemas/application.schemas";
import { container } from "tsyringe";
import { ApplicationServices } from "../services/application.services";
import { ValidateToken } from "../middlewares/validateToken.middleware";

export const applicationRouter = Router();

container.registerSingleton('ApplicationServices', ApplicationServices);
const applicationControllers = container.resolve(ApplicationControllers);

applicationRouter.post('/:id/applications', ValidateRequest.execute({ body: applicationCreateSchema }), (req, res) => applicationControllers.create(req, res));
applicationRouter.get('/:id/applications', ValidateToken.execute, (req, res) => applicationControllers.findMany(req, res));