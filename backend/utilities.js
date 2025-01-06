/**
 * The authenticateToken function ensures secure access to protected routes:
 * 1. It checks the 'Authorization' header for a token.
 * 2. If no token is found, it responds with a 401 (Unauthorized) status.
 * 3. If a token is found, it verifies it using the secret key (ACCESS_TOKEN_SECRET):
 *    - If the token is invalid, it responds with a 403 (Forbidden) status.
 *    - If the token is valid, it extracts the user's details from the token.
 * 4. The extracted user details are added to the request object (req.user).
 * 5. The request is then allowed to proceed to the next middleware or route handler.
 */

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });

}

module.exports = {
    authenticateToken
};

