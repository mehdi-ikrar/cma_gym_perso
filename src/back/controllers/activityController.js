
export const activity = [
  {
    id: 1,
    groupe: "Groupes competions",
    description: "Activité d'éveil corporel adaptée aux tout-petits pour développer la motricité",
    horraire: "lundi et mercredi 18h00-20h00",
    public: "Feminins Justaucorps inclus",
    cotisation: "180€ a 210€",
    frequence: "2 cours par semaine",
    categoryId: 4 // Catégorie Compétition
  },
  {
    id: 2,
    groupe: "Gymnastique artistique avancée",
    description: "Entraînement intensif aux agrès pour gymnastes confirmés",
    horraire: "14h00",
    public: "Adultes",
    cotisation: "100€",
    categoryId: 1 // Catégorie Gymnastique artistique
  },
  {
    id: 3,
    groupe: "Gymnastique artistique intermédiaire",
    description: "Perfectionnement des mouvements et figures sur les différents agrès",
    horraire: "16h00",
    public: "Adolescents et adultes",
    cotisation: "100€",
    frequence: "Hebdomadaire",
    categoryId: 1 // Catégorie Gymnastique artistique
  },
  {
    id: 4,
    groupe: "Gymnastique rythmique",
    description: "Initiation aux mouvements avec cerceaux, rubans et ballons",
    horraire: "18h00",
    public: "Tous publics",
    cotisation: "100€",
    frequence: "Hebdomadaire",
    categoryId: 2 // Catégorie Gymnastique rythmique
  },
  {
    id: 5,
    groupe: "Gym douce",
    description: "Séances d'étirements et exercices simples pour améliorer la souplesse",
    horraire: "20h00",
    public: "Enfants et débutants",
    cotisation: "100€",
    frequence: "Hebdomadaire",
    categoryId: 3 // Catégorie Fitness & Bien-être
  }
];

// Object that groups functions (methods) to manage operations related to activities.
export const activityController = {
    // Method that retrieves all activities
    async renderAllActivities(req, res) {
            try {
                // Utiliser le tableau statique au lieu de la base de données
                
                // Rendre la vue des activités
                res.status(200).render('../front/views/pages/activities', { 
                    activities: activity,
                });
            } catch (err) {
                console.error(err);
                res.status(500).render('error', { message: 'Error retrieving activities.' });
            }
        },
        
    // Method that retrieves one activity by ID
    async renderOneActivity(req, res) {
        try {
            // Récupérer l'ID de l'activité depuis les paramètres de l'URL
            const activityId = parseInt(req.params.id);
            
            // Récupérer l'activité correspondante à cet ID depuis le tableau
            const activityData = activity.find(act => act.id === activityId);
            
            // Vérifier si l'activité existe
            if (!activityData) {
                return res.status(404).render('error', { message: 'Activity not found.' });
            }
            
            // Rendre la vue avec les données de l'activité
            res.status(200).render('../front/views/pages/activity', { 
                activity: activityData,
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error retrieving activity data.' });
        }
    }
};