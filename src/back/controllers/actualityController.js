import { Actuality, Category, Galerie } from "../models/associations.js";
import { Op } from "sequelize"; // Ajouter l'import de Op pour les opérateurs de comparaison

export const actualityController = {
    async renderNewActualities(req, res) {
        try {
            // Récupérer les trois dernières actualités avec leurs galeries
            const actualities = await Actuality.findAll({
                order: [['createdAt', 'DESC']], // Du plus récent au plus ancien
                limit: 3, // Limiter à 3 actualités
                include: [
                    { model: Galerie, as: 'galerie' }
                ]
            });

            // Rendre la vue des actualités
            res.status(200).render('../front/views/pages/home', { 
                actualities,
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error retrieving actualities.' });
        }
    },
    // Nouvelle fonction pour récupérer une seule actualité par son ID
    async renderOneActuality(req, res) {
        try {
            // Récupérer l'ID de l'actualité depuis les paramètres de l'URL
            const actualityId = req.params.id;
            
            // Récupérer l'actualité correspondante à cet ID avec sa catégorie
            const actuality = await Actuality.findByPk(actualityId, {
                include: [
                    { model: Category, as: 'category' },
                    { model: Galerie, as: 'galerie' }
                ]
            });
            
            // Vérifier si l'actualité existe
            if (!actuality) {
                return res.status(404).render('error', { message: 'Actuality not found.' });
            }
            
            // Récupérer toutes les actualités de la même catégorie (y compris l'actuelle)
            const sameCategoryActualities = await Actuality.findAll({
                where: {
                    category_id: actuality.category_id
                },
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: Category,
                        as: 'category'
                    }
                ]
            });

            // Récupérer les actualités connexes (même catégorie, mais pas l'actualité actuelle)
            const relatedActualities = await Actuality.findAll({
                where: {
                    category_id: actuality.category_id,
                    id: { [Op.ne]: actualityId } // Exclure l'actualité actuelle
                },
                order: [['createdAt', 'DESC']], // Du plus récent au plus ancien
                limit: 3, // Limiter à 3 actualités connexes
                include: [
                    {
                        model: Category,
                        as: 'category'
                    }
                ]
            });
            
            // Rendre la vue avec les données de l'actualité, les actualités connexes et toutes les actualités de la même catégorie
            res.status(200).render('../front/views/pages/actuality', { 
                actuality,
                relatedActualities,
                sameCategoryActualities
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error retrieving actuality data.' });
        }
    },
    async renderAllActualities(req, res) {
        try {
            // Détection mobile via user-agent (simple, amélioré)
            const userAgent = req.headers['user-agent'] || '';
            const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);

            // Si mobile, 3 actus par page, sinon 10
            const limit = isMobile ? 3 : 10;
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * limit;
            const selectedCategory = req.query.category;

            const categories = await Category.findAll({ order: [['title', 'ASC']] });

            // Filtre par catégorie si présent
            const where = selectedCategory ? { category_id: selectedCategory } : {};

            const totalActualities = await Actuality.count({ where });

            // Inclure la galerie pour chaque actu de la liste
            const actualities = await Actuality.findAll({
                where,
                order: [['createdAt', 'DESC']],
                limit,
                offset,
                include: [
                    { model: Category, as: 'category' },
                    { model: Galerie, as: 'galerie' }
                ]
            });

            const totalPages = Math.ceil(totalActualities / limit);

            res.status(200).render('../front/views/pages/actualities', {
                actualities,
                categories,
                currentPage: page,
                totalPages,
                selectedCategory
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des actualités: ' + err.message);
        }
    },
    async deleteActuality(req, res) {
        try {
            const id = req.params.id;
            // Supprimer l'actualité par son ID
            await Actuality.destroy({ where: { id } });
            res.redirect('/actualities');
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Erreur lors de la suppression de l\'actualité.' });
        }
    },
};