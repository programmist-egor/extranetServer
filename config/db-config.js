import dotenv from "dotenv";
dotenv.config()


export const configExtranetDB = {
    DB: process.env.EXTRANETDB,
    USER: process.env.USEREXTRANET,
    PASSWORD: process.env.PASSWORD,
    HOST: process.env.HOST,
    pool: {
        max: 10,
        min: 0,
        acquire: 90000,
        idle: 50000
    }
}

