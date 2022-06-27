"use strict";

// ExpressServer erstellen
const express = require("express");
const expressServer = express();
expressServer.use(
  express.static("public", {
    extensions: ["html"],
  })
);

// httpServer erstellen
const http = require("http");
const httpServer = http.Server(expressServer);

// websocket erstellen
const socketIo = require("socket.io");
const ioServer = socketIo(httpServer);

// Socket-Eventlistener
ioServer.on("connect", (socket) => {
  //Nachricht vom User empfangen
  socket.on("msgFromClient", (data) => {
    data.senderID = socket.id;
    //Nachricht an den User schicken
    ioServer.emit("msgFromServer", data);
  });
});

// Auf Port 80 lauschen
const init = () => {
  httpServer.listen(80, (err) => console.log(err || "Server läuft"));
};

init();
