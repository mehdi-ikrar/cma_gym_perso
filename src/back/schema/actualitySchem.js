import Joi from 'joi';

export const actualityCreateSchema = Joi.object({
  name: Joi.string().min(3).max(250).required().messages({
    "string.min": "Le categorie doit contenir au moins 3 caractères.",
    "string.max": "Le categorie ne peut pas dépasser 50 caractères.",
    "any.required": "Le titre du actuality est obligatoire."
  }),
  description: Joi.string().optional().messages({
    "string.max": "La descritpion ne peut pas dépasser 50 caractères.",
  }),
})
  .required();
  
export const actualityUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(250).required().messages({
    "string.min": "Le categorie doit contenir au moins 3 caractères.",
    "string.max": "Le categorie ne peut pas dépasser 50 caractères.",
    "any.required": "Le categorie est obligatoire."
    }),
  description: Joi.string().optional().messages({
    "string.max": "La descritpion ne peut pas dépasser 50 caractères.",
    }),
})
  
  .min(1);
    