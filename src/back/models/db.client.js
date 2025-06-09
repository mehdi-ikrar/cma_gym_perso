import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  define: {
    timestamps: true,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,  // Ignore le certificat auto-signé
    },
  },
  logging: false, // optionnel : ça calme un peu les logs Sequelize
});
