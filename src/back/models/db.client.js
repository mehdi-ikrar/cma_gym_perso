import "dotenv/config";
import { Sequelize } from "sequelize";

// On récupère l'URL (qui sera celle de Neon sur Render, ou localhost sur votre PC)
const databaseUrl = process.env.PG_URL;

if (!databaseUrl) {
  console.error("❌ Erreur : La variable PG_URL est introuvable !");
  process.exit(1);
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    // Cette option est indispensable pour que Neon accepte la connexion sécurisée en ligne
    ssl: databaseUrl.includes("localhost") ? false : {
      require: true,
      rejectUnauthorized: false
    }
  },
  define: {
    timestamps: true
  }
});
/*
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  define: {
    timestamps: true
  }
});
*/