import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { activityController } from '../controllers/activityController.js';
import { actualityController } from '../controllers/actualityController.js';
import { employeeController } from '../controllers/employeeController.js';
import { contactController } from '../controllers/contactController.js';
import { formController } from '../controllers/formController.js';
import { authController } from '../controllers/authController.js';

import { requireAuth } from '../middlewares/requireAuth.js';
import { checkAuth } from '../middlewares/checkAuth.js';

export const router = new Router();

// Config multer pour upload images
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const folderPath = "front/public/image";

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath);
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes publiques
router.get('/', actualityController.renderNewActualities);
router.get('/team', employeeController.renderAllEmployee);
router.get('/login', authController.renderLogin);
router.post('/login', authController.loginUser);

router.get('/employees/:id', employeeController.renderOneEmployee);
router.get('/actuality/:id', actualityController.renderOneActuality);
router.get('/actualities', actualityController.renderAllActualities);
router.get('/activities', activityController.renderAllActivities);
router.get('/contact', contactController.renderAllContact);

// Routes protégées (auth requise)
router.get('/form', requireAuth, formController.renderForm);
router.get('/modifForm', checkAuth, requireAuth, formController.renderModifForm);

router.post('/actualities/add', requireAuth, upload.single('image'), formController.submitForm);
router.post('/actualities/delete/:id', requireAuth, actualityController.deleteActuality);
router.post('/actualities/update/:id', requireAuth, upload.single('image'), formController.updateActuality);

// Routes changement de mot de passe (auth requise)
router.get('/change-password', requireAuth, authController.renderChangePassword);
router.post('/change-password', requireAuth, authController.changePassword);

// Déconnexion
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  req.user = null;
  res.locals.user = null;
  res.redirect('/login');
});
