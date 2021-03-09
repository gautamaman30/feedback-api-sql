import "reflect-metadata"
import express from "express"
import http from "http"
import {RoutesHandler} from "./routes/index"
import configObj from "./config"

//creating server
const app: express.Application = express();
const server: http.Server = http.createServer(app);

//middleware to parse json request
app.use(express.json());

//adding routes handlers
const router = new RoutesHandler();
app.use('/api/v1', router.configureRoutes());
app.use('/', router.configureInvalidRoutes());

//running server 
server.listen(configObj.PORT, () => console.log(`server is running at ${configObj.PORT}`));
