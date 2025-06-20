import { Actuality } from './actualityModel.js';
import { Admin  } from './adminModel.js';
import { Category } from './categoryModel.js'; // Import du nouveau modèle Category
import { Galerie } from './galerieModel.js';

// Relations avec les catégories (1:n)
// Une actualité peut avoir 0 ou 1 catégorie
Actuality.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
});
Category.hasMany(Actuality, {
    foreignKey: 'category_id',
    as: 'actualities'
});

// Association entre Actuality et Galerie (1:n)
// Une actualité peut avoir plusieurs images
Actuality.hasMany(Galerie, { foreignKey: 'actuality_id', as: 'galerie' });
Galerie.belongsTo(Actuality, { foreignKey: 'actuality_id', as: 'actuality' });

export { Actuality, Admin, Category, Galerie };