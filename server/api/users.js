import User from '../model/User.js';

export default function (server) {
    server.get('/api/users', async (req, res) => {
        res.json(await User.find());
    });
}
