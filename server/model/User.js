import mongoose from 'mongoose';

// Skapar ett schema för "users", vilket definierar strukturen för varje "user"-dokument i databasen.
const usersSchema = new mongoose.Schema({
    username: String, // Varje "user" kommer att ha ett "username".
    password: String,
    email: String,
});

/* 
  Skapar en Mongoose-modell baserat på usersSchema.
  Detta möjliggör för oss att skapa, läsa, uppdatera och radera (CRUD) dokument i vår "users"-samling (collection).
*/
const User = mongoose.model('users', usersSchema);

export default User;
