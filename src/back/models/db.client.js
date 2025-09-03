import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "postgres",
    host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    define: {
      timestamps: true
    }
  }
);


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