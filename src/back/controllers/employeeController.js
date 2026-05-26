// Tableau des employés statique
export const employee = [
  {
    id: 1,
    name: "Silvy",
    firstname: "Patricia",
    role: "admin", // anciennement "administration"
    image: "coach.jpg",
    description: "President."
  },
  {
    id: 2,
    name: "Alexandre",
    firstname: "John",
    role: "admin", // anciennement "Benevole"
    image: "coach.jpg",
    description: "Co-president "
  },
  {
    id: 13,
    name: "Nathalie",
    firstname: "Doe",
    role: "coach", // anciennement "Administration"
    image: "coach.jpg",
    description: "C'est un admin."
  },
  {
    id: 3,
    name: "Henrique",
    firstname: "Jane",
    role: "coach", // anciennement "Coach"
    image: "coach.jpg",
    description: "C'est une coach."
  },
  {
    id: 4,
    name: "Anissa",
    firstname: "Doe",
    role: "coach", // anciennement "Administration"
    image: "coach.jpg",
    description: "C'est un admin."
  },
  {
    id: 5,
    name: "Emma",
    firstname: "Doe",
    role: "coach", // anciennement "Administration"
    image: "coach.jpg",
    description: "C'est un admin."
  },
  {
    id: 6,
    name: "Hariata",
    firstname: "Doe",
    role: "coach", // anciennement "Administration"
    image: "coach.jpg",
    description: "C'est un admin."
  },
  {
    id: 7,
    name: "Katia",
    firstname: "Doe",
    role: "coach", // anciennement "Administration"
    image: "coach.jpg",
    description: "C'est un admin."
  },
  {
    id: 8,
    name: "Eva",
    firstname: "Doe",
    role: "coach", // anciennement "Administration"
    image: "coach.jpg",
    description: "C'est un admin."
  },
  {
    id: 9,
    name: "Jacky",
    firstname: "Doe",
    role: "coach", // anciennement "Administration"
    image: "coach.jpg",
    description: "C'est un admin."
  },
  {
    id: 10,
    name: "Maud",
    firstname: "Doe",
    role: "coach", // anciennement "Administration"
    image: "coach.jpg",
    description: "C'est un admin."
  },
  {
    id: 11,
    name: "Celia",
    firstname: "Doe",
    role: "coach", // anciennement "Administration"
    image: "coach.jpg",
    description: "C'est un admin."
  },
  {
    id: 12,
    name: "Eric",
    firstname: "Doe",
    role: "coach", // anciennement "Administration"
    image: "coach.jpg",
    description: "C'est un admin."
  }
];

// Object that groups functions (methods) to manage operations related to employees.
export const employeeController = {

    async renderAllEmployee(req, res) {
        try {
            // Utiliser le tableau statique au lieu de la base de données
            
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
            const employeeId = parseInt(req.params.id);
            
            // Récupérer l'employé correspondant à cet ID depuis le tableau
            const employeeData = employee.find(emp => emp.id === employeeId);
            
            // Vérifier si l'employé existe
            if (!employeeData) {
                return res.status(404).render('error', { message: 'Employee not found.' });
            }
            
            // Rendre la vue avec les données de l'employé
            res.status(200).render('../front/views/pages/employee', { 
                employee: employeeData,
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error retrieving employee data.' });
        }
    }
};