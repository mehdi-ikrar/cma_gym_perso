import { Contact } from "../models/contactModel.js";

// Object that groups functions (methods) to manage operations related to difficulties.
export const contactController = {
    // Method that retrieves a difficulty by its ID
    async renderAllContact(req, res) {
            try {
                // Récupérer les actualités
                const contact = await Contact.findAll();
    
                // Rendre la vue des actualités
                res.status(200).render('../front/views/pages/contact', { 
                    contact,
                });
            } catch (err) {
                console.error(err);
                res.status(500).render('error', { message: 'Error retrieving actualities.' });
            }
        },
};