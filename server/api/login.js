import User from '../model/User.js';
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

export default function (server) {
    // endpoint get login
    server.get('/api/login', async (req, res) => {
        const user = req.session.user;
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'No user is logged in.' });
        }
    });

    // endpoint for post login
    server.post('/api/login', async (req, res) => {
        if (!req.session?.user) {
            const username = req.body.username;
            const password = req.body.password;

            try {
                // Find user by username
                const user = await User.findOne({ username });

                if (!user) {
                    return res.status(404).json({ message: 'User not found.' });
                }

                // Compare hashed password
                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isPasswordValid) {
                    return res
                        .status(404)
                        .json({ message: 'Invalid password.' });
                }

                req.session.user = user;
                res.status(200).json(user);
            } catch (error) {
                console.error('Error during login:', error);
                res.status(500).json({ message: 'Internal Server Error.' });
            }
        } else {
            res.status(409).json({ message: 'Someone is already logged in!' });
        }
    });
}
