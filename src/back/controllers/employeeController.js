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
        
        // Fonction pour récupérer un seul employé par son ID
        async renderOneEmployee(req, res) {
            try {
                // Récupérer l'ID de l'employé depuis les paramètres de l'URL
                const employeeId = req.params.id;
                
                // Récupérer l'employé correspondant à cet ID
                const employee = await Employee.findByPk(employeeId);
                
                // Vérifier si l'employé existe
                if (!employee) {
                    return res.status(404).render('error', { message: 'Employee not found.' });
                }
                
                // Rendre la vue avec les données de l'employé
                res.status(200).render('../front/views/pages/employee', { 
                    employee,
                });
            } catch (err) {
                console.error(err);
                res.status(500).render('error', { message: 'Error retrieving employee data.' });
            }
        }
};