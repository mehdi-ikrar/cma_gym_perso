import "dotenv/config";
import { sequelize } from "../models/db.client.js";
import {Game, Gamer, Difficulty, Category, RunHasVote, ChallengeHasVote, Challenge, Run} from "../models/associations.js";
import { gamers } from "../data/gamers.js";
import { categories } from "../data/categories.js";
import { difficulties } from "../data/difficulties.js";
import { games } from "../data/game.js";
import { challenges } from "../data/challenges.js";
import argon2 from 'argon2';


// Seeding table gamer with fake informations 
for(const gamer of gamers){
    await Gamer.create({
        username: gamer.username,
        lastname: gamer.lastname,
        firstname: gamer.firstname,
        mail: gamer.mail,
        password: await argon2.hash(gamer.password) 
    })
};

// Seeding table category with informations
for(const category of categories){
    await Category.create({
        name: category.name,
        description: category.description
    })
};

// Seeding table difficulty with informations
for(const difficulty of difficulties){
    await Difficulty.create({
        name: difficulty.name,
        level: difficulty.level
    })
};

for(const game of games){
    await Game.create({
        title : game.title,
        image: game.image,
        year: game.year
    })
}


for(const challenge of challenges){
    const createdChallenge = await Challenge.create({
        title: challenge.title,
        description: challenge.description,
        rules: challenge.rules,
        gamer_id: challenge.userId,
        difficulty_id: challenge.difficultyId
    });

    await createdChallenge.addGames(challenge.gameId);
    await createdChallenge.addCategories(challenge.categoryId);

    for(const vote of challenge.votes){
        await ChallengeHasVote.create({
            challenge_id: createdChallenge.id,
            score: vote.score,
            gamer_id: vote.userId
        })
    }

    for(const run of challenge.runs){
        const createdRun = await Run.create({
            gamer_id: run.userId,
            challenge_id: challenge.id,
            proof: run.success
        });
        for(const voteRun of run.votes){
            await RunHasVote.create({
                run_id: createdRun.id,
                score: voteRun.score,
                gamer_id: voteRun.userId
            });
        }
    }
}

console.log('seeding done');
await sequelize.close()