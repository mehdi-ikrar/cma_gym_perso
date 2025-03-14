import { Employee} from "../models/employeeModel.js";

// Object that groups functions (methods) to manage operations related to difficulties.
export const employeeController = {

        async renderAllEmployee(req, res) {
            try {
                // Récupérer les actualités
                const employee = await Employee.findAll();

                // Rendre la vue home.ejs (qui se trouve dans le dossier views/pages/)
                res.status(200).render('../front/views/pages/team', { 
                    employee,
                });
            } catch (err) {
                console.error(err);
                res.status(500).render('error', { message: 'Error retrieving data for homepage.' });
            }
        },
        

};