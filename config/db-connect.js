import {Sequelize} from "sequelize";
import { configExtranetDB} from "./db-config.js";

const sequelizeExtranet = new Sequelize(configExtranetDB.DB, configExtranetDB.USER, configExtranetDB.PASSWORD, {
    host: configExtranetDB.HOST,
    dialect: "mysql",
    port: 3306,
    pool: {
        max: configExtranetDB.pool.max,
        min: configExtranetDB.pool.min,
        acquire: configExtranetDB.pool.acquire,
        idle: configExtranetDB.pool.idle
    },
    define: {
        timestamps: false
    }
});


export { sequelizeExtranet}