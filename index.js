import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./router/auth-router.js"
import cookieParser from "cookie-parser";
import { sequelizeExtranet} from "./config/db-connect.js";
import http from "http";
import ApiError from "./exceptions/api-error.js";
import {errorMiddlewares} from "./middlewares/error-middlewares.js";
import mainRouter from "./router/main-router.js";
dotenv.config();

const corsOptions = {
    credentials: true,
    origin: process.env.API_CLIENT
};


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/', router);
app.use('/', mainRouter);
app.use('/add_object', mainRouter);
app.use('/setting_object', mainRouter);
app.use('/setting_number', mainRouter);
app.use('/setting_profile', mainRouter);
app.use('/booking', mainRouter);
app.use(ApiError)
app.use(errorMiddlewares)
const server = http.createServer(app);
server.timeout = 12000000;
const PORT = process.env.PORT || 5000;







// Запускаем сервер
const start = async () => {
    try {
        await sequelizeExtranet.sync();
        server.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}
start()