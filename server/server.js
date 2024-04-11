// Import Express to conect to web server Mongoose to interact with the MongoDB-database.
import express from "express";
import mongoose from "mongoose";
import apiRegister from "./apiRegister.js";

// Create a const with the express app - our web server
const server = express();

// Decide a port to litsen to
const port = 3000;

/*
  The server uses a middleware ( express.json() ) to transform our requests to JSON.
  Detta gör att vi kan hantera JSON-data som skickas i request body.
*/
server.use(express.json());

/* 
  Vår MongoDB Atlas connection-string
  Ansluter till MongoDB-databasen med hjälp av Mongoose.
  Strängen innehåller: 
    Användarnamn - <Username>
    Lösenord - <Password>
    Databasnamnet (Optional) - <DB-Name>
*/
mongoose.connect(
  "mongodb+srv://christiancastellanosmeza:123@x-auction.xvz33my.mongodb.net/?retryWrites=true&w=majority&appName=X-Auction"
);
/*
  Byt ut connection-string'en med er egna. Ni hittar er på MongoDB Atlas genom att gå in på: 

  Database -> 
  Kolla att ni har en databas, heter ofta "Cluster0" ->
  Trycka på "Connect" för den databasen ni vill ansluta till ->
  Kolla att eran nuvarande ip-adress är tillagd ->
  Välj "Compass" ->
  Under "2. Copy the connection string" hittar ni er connection-string

  OBS. Glöm inte ändra <password> !
*/

apiRegister(server, mongoose);

/* 
  Startar servern så att den lyssnar på den definierade porten.
  När servern har startat, loggas ett meddelande till konsolen.
*/
server.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
