import { Router } from 'express';
import { activityController } from '../controllers/activityController.js';
import { actualityController } from '../controllers/actualityController.js';
import { employeeController } from '../controllers/employeeController.js';
import { contactController } from '../controllers/contactController.js';
import { formController } from '../controllers/formController.js';
import multer from "multer";
import path from "path";
import fs from 'fs';

export const router = new Router();

// Configuration de multer pour l'upload d'image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = "front/public/image";

    // Utilisation synchrone de fs pour vérifier/créer le dossier
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true }); // Crée récursivement si besoin
    }
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });



// Dans le fichier du routeur
router.get('/', actualityController.renderNewActualities);

router.get('/team', employeeController.renderAllEmployee);

router.get('/form', formController.renderForm);

router.get('/modifForm', formController.renderModifForm);

router.get('/employees/:id', employeeController.renderOneEmployee);

router.get('/actuality/:id', actualityController.renderOneActuality);

router.get('/actualities', actualityController.renderAllActualities);
router.get('/activities', activityController.renderAllActivities);

router.get('/contact', contactController.renderAllContact);

// Ajout du POST pour la soumission du formulaire d'actualité
router.post('/actualities/add', upload.single('image'), formController.submitForm);

// Route pour supprimer une actualité
router.post('/actualities/delete/:id', actualityController.deleteActuality);
router.post('/actualities/update/:id', upload.single('image'), formController.updateActuality);