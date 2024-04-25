import User from "../model/User.js";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

export default function (server, db) {
  server.patch("/api/edituser", async (req, res) => {
    if (req.session?.user) {
      const userId = req.session.user._id;
      const username = req.session.user.username;
      const currentPassword = req.body.currentPassword;
      const newEmail = req.body.email;
      const newPassword = req.body.newPassword;

      // Verify the provided current password matches the user's current password
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Compare hashed password
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Current password is incorrect." });
      }

      // Update email and/or password if provided
      if (newEmail) {
        const existingEmailUser = await User.findOne({ email: newEmail });
        if (existingEmailUser && existingEmailUser._id.toString() !== userId) {
          return res.status(400).json({ message: "Email is already in use." });
        }
        user.email = newEmail;
      }
      if (newPassword) {
        { user.password = newPassword; }
      }

      // Save the updated user
      await user.save();

      // Respond with the updated user object
      res.status(200).json(user);
    } else {
      res.status(403).json({ message: "User is not logged in." });
    }
  });
}
