export default function (server) {
    // Method to delete login, in other words logout
    server.delete('/api/login', async (req, res) => {
        if (req.session?.user) {
            delete req.session.user;

            // Return logout successful if successful
            res.status(200).json({ message: 'Logout successful' });
        } else {
            // Return no user is logged in, if no user is logged in
            res.status(404).json({ message: 'No user is logged in' });
        }
    });
}
