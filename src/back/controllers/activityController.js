import { Activity } from "../models/activityModel.js";

// Object that groups functions (methods) to manage operations related to difficulties.
export const activityController = {
    // Method that retrieves a difficulty by its ID
    async renderAllActivities(req, res) {
            try {
                // Récupérer les actualités
                const actualities = await Activity.findAll();
    
                // Rendre la vue des actualités
                res.status(200).render('../front/views/pages/activities', { 
                    actualities,
                });
            } catch (err) {
                console.error(err);
                res.status(500).render('error', { message: 'Error retrieving actualities.' });
            }
        },
};