const express = require('express');
const helmet = require('helmet');
const cors = require('cors')

// const authRouter = require('../auth/auth-router.js')
// const userRouter = require('../router/userRouter.js')
// const restrictedMW = require('../auth/resstrictMiddlewar')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(logger)

// server.use("/api/auth", authRouter);
// server.use("/api/users", restrictedMW, userRouter);

server.get("/", (req, res) => {
    res.status(200).json({Hello: " World, The api is working"})
})
function logger (req, res, next){
    console.log(`${req.method} request the ${req.url}`, Date())
    next();
}

module.exports = server;