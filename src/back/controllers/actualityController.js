import { Actuality} from "../models/actualityModel.js";

// Object that groups functions (methods) to manage operations related to difficulties.
export const actualityController = {

    async renderAllActuality(req, res) {
        try {
            // Récupérer les actualités
            const actualities = await Actuality.findAll();
            
            // Rendre la vue home.ejs (qui se trouve dans le dossier views/pages/)
            res.status(200).render('../front/views/pages/home', { 
                actualities,
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error retrieving data for homepage.' });
        }
    },
    

};