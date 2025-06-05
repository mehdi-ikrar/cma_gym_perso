import { Category } from "../models/categoryModel.js";
import { Actuality } from "../models/actualityModel.js";
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

            // Récupérer l'actualité à modifier (avec sa catégorie)
            let actuality = null;
            if (id) {
                actuality = await Actuality.findByPk(id, {
                    include: [{ model: Category, as: 'category' }]
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
            // Récupération des champs du formulaire
            const { title, category_id, description } = req.body;
            let image = null;

            // Gestion de l'upload d'image si un fichier est envoyé
            if (req.file) {
                image = req.file.filename;
            }

            // Création de l'actualité dans la BDD
            await Actuality.create({
                title,
                category_id,
                description,
                image
            });

            res.redirect('/actualities');
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Erreur lors de l\'ajout de l\'actualité.' });
        }
    },

    async updateActuality(req, res) {
        try {
            const id = req.params.id;
            const { title, category_id, description } = req.body;
            let updateData = { title, category_id, description };

            // Si une nouvelle image est uploadée, on la prend, sinon on garde l'ancienne
            if (req.file) {
                updateData.image = req.file.filename;
            }

            await Actuality.update(updateData, { where: { id } });

            res.redirect('/actualities');
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: "Erreur lors de la mise à jour de l'actualité." });
        }
    },
};