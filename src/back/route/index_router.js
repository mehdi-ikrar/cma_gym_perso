import { Router } from 'express';
import { activityController } from '../controllers/activityController.js';
import { actualityController } from '../controllers/actualityController.js';
import { employeeController } from '../controllers/employeeController.js';
import { contactController } from '../controllers/contactController.js';

export const router = new Router();




// Dans le fichier du routeur
router.get('/', actualityController.renderNewActualities);

router.get('/team', employeeController.renderAllEmployee);

router.get('/employees/:id', employeeController.renderOneEmployee);

router.get('/actuality/:id', actualityController.renderOneActuality);

router.get('/actualities', actualityController.renderAllActualities);
router.get('/activities', activityController.renderAllActivities);

router.get('/contact', contactController.renderAllContact);