import express from "express";
import userRouter from "./src/routes/user.routes";

const server = express();

const port = 8080;

server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

server.use(express.json());

server.use('/usuarios', userRouter);
server.listen(port, () => {
    console.log('Server escutando na porta ' + port);
})