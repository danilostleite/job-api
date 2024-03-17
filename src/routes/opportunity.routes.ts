import { Router } from "express";
import { OpportunityControllers } from "../controllers/opportunity.controllers";
import { applicationRouter } from "./application.routes";
import { ValidateRequest } from "../middlewares/validateRequest.middleware";
import { opportunityCreateSchema, opportunityUpdateSchema } from "../schemas/opportunity.schemas";
import { IsOpportunityIdValid } from "../middlewares/isOpportunityIdValid.middleware";
import { container } from "tsyringe";
import { ValidateToken } from "../middlewares/validateToken.middleware";
import { OpportunityServices } from "../services/opportunity.services";
import { IsOpportunityOwner } from "../middlewares/isOpportunityOwner.middleware";

export const opportunityRouter = Router();

container.registerSingleton('OpportunityServices', OpportunityServices);
const opportunityControllers = container.resolve(OpportunityControllers);

opportunityRouter.post('/', ValidateToken.execute, ValidateRequest.execute({ body: opportunityCreateSchema }), (req, res) => opportunityControllers.create(req, res));
opportunityRouter.get('/', (req, res) => opportunityControllers.findMany(req, res));
opportunityRouter.get('/user', ValidateToken.execute, (req, res) => opportunityControllers.findMany(req, res));

opportunityRouter.use('/:id', IsOpportunityIdValid.execute);
opportunityRouter.get('/:id', ValidateToken.execute, IsOpportunityOwner.execute, (req, res) => opportunityControllers.findOne(req, res));
opportunityRouter.patch('/:id', ValidateToken.execute, IsOpportunityOwner.execute, ValidateRequest.execute({ body: opportunityUpdateSchema }), (req, res) => opportunityControllers.update(req, res));
opportunityRouter.delete('/:id', ValidateToken.execute, IsOpportunityOwner.execute, (req, res) => opportunityControllers.delete(req, res));

opportunityRouter.use('/', applicationRouter);