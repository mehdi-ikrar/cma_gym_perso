import { Activity } from "../models/activityModel.js";

// Object that groups functions (methods) to manage operations related to difficulties.
export const activityController = {
    // Method that retrieves a difficulty by its ID
    async getOneActivity(req, res) {
        const { id } = req.params;
        try {
            const activity = await Activity.findByPk(id);
            if (!activity) {
                return res.status(404).json({ message: 'activity not found.' });
            }
            res.status(200).json(activity);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving the activity.' });
        }
    },

    // Method that retrieves all difficulties
    async getAllActivities(req, res) {
        try {
            const activities = await Activity.findAll({
            });
            res.status(200).json(activities);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving activities.' });
        }
    },

    // Method that updates a activity by retrieving its ID and the information to modify
    async updateActivity(req, res) {
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