import User from '../model/User.js';

export default function (server, db) {
    server.get('/api/products', async (req, res) => {
        res.json(await User.find());
    });
}
