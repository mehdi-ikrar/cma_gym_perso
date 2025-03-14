import { Router } from 'express';
import { activityController } from '../controllers/activityController.js';
import { actualityController } from '../controllers/actualityController.js';
import { employeeController } from '../controllers/employeeController.js';

export const router = new Router();




// Dans le fichier du routeur
router.get('/', actualityController.renderAllActuality);

router.get('/team', employeeController.renderAllEmployee);

router.get('/employees/:id', employeeController.renderOneEmployee);