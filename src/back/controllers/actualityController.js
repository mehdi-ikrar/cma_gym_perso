import { Actuality } from "../models/actualityModel.js";

export const actualityController = {
    async renderNewActualities(req, res) {
        try {
            // Récupérer les trois dernières actualités
            const actualities = await Actuality.findAll({
                order: [['createdAt', 'DESC']], // Du plus récent au plus ancien
                limit: 3 // Limiter à 3 actualités
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
            
            // Récupérer l'actualité correspondante à cet ID
            const actuality = await Actuality.findByPk(actualityId);
            
            // Vérifier si l'actualité existe
            if (!actuality) {
                return res.status(404).render('error', { message: 'Actuality not found.' });
            }
            
            // Rendre la vue avec les données de l'actualité
            res.status(200).render('../front/views/pages/actuality', { 
                actuality,
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error retrieving actuality data.' });
        }
    },
    async renderAllActualities(req, res) {
        try {
            // Récupérer les actualités
            const actualities = await Actuality.findAll();

            // Rendre la vue des actualités
            res.status(200).render('../front/views/pages/actualities', { 
                actualities,
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error retrieving actualities.' });
        }
    },
};