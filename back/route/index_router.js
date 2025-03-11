import { Router } from 'express';
import { activityController } from '../controllers/activityController.js';
import { actualityController } from '../controllers/actualityController.js';
import { employeeController } from '../controllers/employeeController.js';

export const router = new Router();


router.get('/activity', activityController.getAllActivities);
router.get('/activity/:id', activityController.getOneActivity);


router.get('/actuality', actualityController.getAllActuality);
router.get('/actuality/:id', actualityController.getOneActuality);


router.get('/employee', employeeController.getAllEmployee);
router.get('/employee/:id', employeeController.getOneEmployee);