import User from '../model/User.js';

export default function (server, db) {
    server.get('/api/users', async (req, res) => {
        res.json(await User.find());
    });
    
server.post("/api/users", async (req, res) => {
    const { username, email, password } = req.body;
  
    // Check if username already exists in the database
    const existingUsername = await User.findOne({username});
    const existingEmail = await User.findOne({ email});
  
    if (existingUsername || existingEmail) {
      // Username already exists, return an error response
      return res.status(400).json({ message: "Username already taken" });
    }
  
    
  
    // Create new user document
    const newUser = new User({
      username,
      email,
      password, // Store hashed password in the database
    });
  
    // Save the new user document to the database
    await newUser.save();
  
    // Return a success message
    return res.status(201).json({ message: "User registered successfully" });
  });

}