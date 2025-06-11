import { Category } from "../models/categoryModel.js";
import { Actuality } from "../models/actualityModel.js";
import { Galerie } from "../models/galerieModel.js";
import path from "path";
import fs from "fs";

// Object that groups functions (methods) to manage operations related to difficulties.
export const formController = {
    // Method that retrieves a difficulty by its ID
    async renderForm(req, res) {
        try {
            // Récupérer les catégories uniquement
            const categories = await Category.findAll();

            res.status(200).render('../front/views/pages/form', { 
                categories,
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error retrieving categories.' });
        }
    },

    async renderModifForm(req, res) {
        try {
            const id = req.query.id;
            // Récupérer les catégories uniquement
            const categories = await Category.findAll();

            // Récupérer l'actualité à modifier (avec sa catégorie et sa galerie)
            let actuality = null;
            if (id) {
                actuality = await Actuality.findByPk(id, {
                    include: [
                        { model: Category, as: 'category' },
                        { model: Galerie, as: 'galerie' }
                    ]
                });
            }

            res.status(200).render('../front/views/pages/modifForm', { 
                categories,
                actuality
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error retrieving actuality or categories.' });
        }
    },

    async submitForm(req, res) {
        try {
            // Ajoute un log pour voir ce que tu reçois du formulaire
            console.log('BODY:', req.body);
            console.log('FILE:', req.file);

            // Récupération des champs du formulaire
            const { title, category_id, description } = req.body;
            let image = null;

            // Gestion de l'upload d'image principale
            if (req.files && req.files['image'] && req.files['image'][0]) {
                image = req.files['image'][0].filename;
            } else if (req.file) {
                image = req.file.filename;
            }

            // Création de l'actualité dans la BDD
            const actuality = await Actuality.create({
                title,
                category_id,
                description,
                image
            });

            // Gestion des images galerie (0 ou plusieurs fichiers)
            if (req.files && req.files['galerie'] && req.files['galerie'].length > 0) {
                for (const file of req.files['galerie']) {
                    await Galerie.create({
                        image: file.filename,
                        actuality_id: actuality.id
                    });
                }
            }
            // Si aucune image galerie, rien n'est créé (comportement attendu)

            res.redirect('/actualities');
        } catch (err) {
            console.error(err);
            // Correction du chemin de la vue error
            res.status(500).render('../front/views/pages/error', { message: 'Erreur lors de l\'ajout de l\'actualité.' });
        }
    },

    async updateActuality(req, res) {
        try {
            console.log('=== DÉBUT UPDATE ACTUALITY ===');
            console.log('Body reçu:', req.body);
            console.log('Files reçus:', req.files);

            const id = req.params.id;
            const { title, category_id, description } = req.body;
            let updateData = { title, category_id, description };

            // Si une nouvelle image est uploadée, on la prend, sinon on garde l'ancienne
            if (req.files && req.files['image'] && req.files['image'][0]) {
                // Si on remplace l'image principale, on supprime l'ancienne
                const oldActuality = await Actuality.findByPk(id);
                if (oldActuality && oldActuality.image) {
                    const oldImagePath = path.join('front/public/image', oldActuality.image);
                    if (fs.existsSync(oldImagePath)) {
                        try {
                            fs.unlinkSync(oldImagePath);
                            console.log(`Image principale supprimée: ${oldImagePath}`);
                        } catch (error) {
                            console.error(`Erreur lors de la suppression du fichier ${oldImagePath}:`, error);
                        }
                    }
                }
                updateData.image = req.files['image'][0].filename;
            }

            // Mise à jour de l'actualité principale
            await Actuality.update(updateData, { where: { id } });
            console.log('Actualité principale mise à jour');

            // 1. Traitement des suppressions d'images existantes
            let deleteIds = [];
            
            // Vérifier différents formats possibles
            if (req.body.delete_images) {
                if (Array.isArray(req.body.delete_images)) {
                    deleteIds = req.body.delete_images;
                } else {
                    deleteIds = [req.body.delete_images];
                }
            } else if (req.body['delete_images[]']) {
                if (Array.isArray(req.body['delete_images[]'])) {
                    deleteIds = req.body['delete_images[]'];
                } else {
                    deleteIds = [req.body['delete_images[]']];
                }
            }

            // Nettoyer les valeurs vides
            deleteIds = deleteIds.filter(id => id && id.trim() !== '');

            console.log('IDs d\'images à supprimer après traitement:', deleteIds);

            if (deleteIds.length > 0) {
                console.log(`Tentative de suppression de ${deleteIds.length} images`);
                
                // Récupérer les images avant suppression
                const imagesToDelete = await Galerie.findAll({
                    where: { id: deleteIds }
                });
                
                console.log(`Trouvé ${imagesToDelete.length} images en base de données`);
                
                // Supprimer les fichiers physiques
                for (const img of imagesToDelete) {
                    const filePath = path.join('front/public/image', img.image);
                    console.log(`Tentative de suppression du fichier: ${filePath}`);
                    
                    if (fs.existsSync(filePath)) {
                        try {
                            fs.unlinkSync(filePath);
                            console.log(`✓ Fichier supprimé: ${filePath}`);
                        } catch (error) {
                            console.error(`✗ Erreur lors de la suppression du fichier ${filePath}:`, error);
                        }
                    } else {
                        console.log(`⚠ Fichier non trouvé: ${filePath}`);
                    }
                }
                
                // Supprimer les entrées en base de données
                try {
                    const deleteResult = await Galerie.destroy({
                        where: { id: deleteIds }
                    });
                    console.log(`✓ ${deleteResult} entrées supprimées de la base de données`);
                } catch (dbError) {
                    console.error('✗ Erreur lors de la suppression des entrées en BDD:', dbError);
                }
            } else {
                console.log('Aucune image à supprimer');
            }

            // 2. Traitement des nouvelles images de galerie
            if (req.files && req.files['galerie'] && req.files['galerie'].length > 0) {
                console.log(`Ajout de ${req.files['galerie'].length} nouvelles images`);
                
                for (const file of req.files['galerie']) {
                    try {
                        const newGalerieImage = await Galerie.create({
                            image: file.filename,
                            actuality_id: id
                        });
                        console.log(`✓ Nouvelle image de galerie ajoutée: ${file.filename} (ID: ${newGalerieImage.id})`);
                    } catch (error) {
                        console.error(`✗ Erreur lors de l'ajout de l'image ${file.filename}:`, error);
                    }
                }
            } else {
                console.log('Aucune nouvelle image à ajouter');
            }

            console.log('=== FIN UPDATE ACTUALITY ===');
            
            // Redirection avec status 302
            res.status(302).redirect('/actualities');
        } catch (err) {
            console.error('ERREUR GLOBALE dans updateActuality:', err);
            res.status(500).render('error', { message: "Erreur lors de la mise à jour de l'actualité." });
        }
    },
};