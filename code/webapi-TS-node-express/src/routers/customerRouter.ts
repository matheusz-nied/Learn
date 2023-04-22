import express, { NextFunction, Request, Response } from 'express';
import customerController from '../controllers/customerController';
import customerRepository from '../repositories/customerRepository';
import Customer from '../models/customer';

const router = express.Router();

async function getCustomer(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const customer = await customerRepository.getCustomer(id);
    if (customer)
        res.json({customer});
    else
        res.sendStatus(404);
}
router.get('/', customerController.getCustomers);

router.post('/', customerController.postCustomer);

async function patchCustomer(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const customer = req.body as Customer;
    const result = await customerRepository.updateCustomer(id, customer);
    if (result)
        res.json(result);
    else
        res.sendStatus(404);
}
async function deleteCustomer(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const success = await customerRepository.deleteCustomer(id);
    if (success)
        res.sendStatus(204);
    else
        res.sendStatus(404);
}
export default router;