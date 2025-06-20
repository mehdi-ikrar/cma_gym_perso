// Object that groups functions (methods) to manage operations related to contact.
export const contactController = {
    // Method that retrieves contact information
    async renderAllContact(req, res) {
            try {
                // Rendre la vue contact sans données
                res.status(200).render('../front/views/pages/contact');
            } catch (err) {
                console.error(err);
                res.status(500).render('error', { message: 'Error retrieving contact data.' });
            }
        },
};