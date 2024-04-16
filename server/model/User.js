import mongoose from 'mongoose';

// Creates "users" schema: defines the structure of every "user" document in our database
const usersSchema = new mongoose.Schema({
    username: String, // Varje "user" kommer att ha ett "username".
    password: String,
    email: String,
});

/* 
  Creates mongoose model based on usersSchema
  Allows us to create/read/update/delete (CRUD) documents in our "users" collection
*/
const User = mongoose.model('users', usersSchema);

export default User;
