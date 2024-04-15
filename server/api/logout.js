import User from '../model/User.js';

export default function (server, db) {
    server.delete('/api/login', async (req, res) => {
        if (req.session?.user) {
            delete req.session.user;
            res.status(200).json({ message: 'Logout successful' });
        } else {
            res.status(404).json({ message: 'No user is logged in' });
        }
    });
}
