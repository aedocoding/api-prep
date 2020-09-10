const express = require("express");
const showsRouter = require("./data/shows/showsRouter")
const charactersRouter = require("./data/characters/charactersRouter")
const helmet = require("helmet");

const server = express();


server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
    res.status(200).json({ message: "The server is online"});
})
server.use("/api/shows", showsRouter) //This belongs under server.use(express.json())
server.use("/api/characters", charactersRouter)
module.exports = server;