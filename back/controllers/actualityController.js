import { Actuality} from "../models/actualityModel.js";

// Object that groups functions (methods) to manage operations related to difficulties.
export const actualityController = {
    // Method that retrieves a difficulty by its ID
    async getOneActuality(req, res) {
        const { id } = req.params;
        try {
            const actuality = await Actuality.findByPk(id);
            if (!actuality) {
                return res.status(404).json({ message: 'actuality not found.' });
            }
            res.status(200).json(actuality);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving the actuality.' });
        }
    },

    // Method that retrieves all difficulties
    async getAllActuality(req, res) {
        try {
            const actuality = await Actuality.findAll({
            });
            res.status(200).json(actuality);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving actuality.' });
        }
    },

    // Method that updates a activity by retrieving its ID and the information to modify
    async updateActuality(req, res) {
        const { id } = req.params;
        const updatedData = req.body;

        try {
            const activity = await Activity.findByPk(id);
            if (!activity) {
                return res.status(404).json({ message: 'Activity not found.' });
            }
            await activity.update(updatedData);
            res.status(200).json(activity);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error updating the activity.' });
        }
    },

     // Method that deletes a difficulty by its ID
     async deleteDifficulty(req, res) {
        const { id } = req.params;
        try {
            const difficulty = await Difficulty.findByPk(id);
            if (!difficulty) {
                return res.status(404).json({ message: 'Difficulty not found.' });
            }
            await difficulty.destroy();
            res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error deleting the difficulty.' });
        }
    },

    // Method that creates a difficulty by retrieving its information from the request body
    async createDifficulty(req, res) {
        const newDifficultyData = req.body;
        try {
            const newDifficulty = await Difficulty.create(newDifficultyData);
            res.status(201).json(newDifficulty);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error creating the difficulty.' });
        }
    }
};