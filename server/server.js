//reviewed
// Import Express to connect to web server Mongoose to interact with the MongoDB-database.
import express from 'express';
import mongoose from 'mongoose';
import apiRegister from './apiRegister.js';
import session from 'express-session';

// Create a const with the express app - our web server
const server = express();

// Decide a port to listen to
const port = 3001;

server.use(express.json());

// Add express session as middleware
server.use(
    session({
        secret: 'ditt_hemliga_tangent',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

mongoose.connect(
    'mongodb+srv://christiancastellanosmeza:123@x-auction.xvz33my.mongodb.net/X-Auction'
);

apiRegister(server, mongoose);

server.listen(port, () =>
    console.log(`Listening on port http://localhost:${port}`)
);
