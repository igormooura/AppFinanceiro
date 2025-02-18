const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ 
            redirect: "https://app-financeiro-client-phi.vercel.app/", 
            message: "Logue para acessar." 
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({ 
                redirect: "https://app-financeiro-client-phi.vercel.app/", 
                message: "Logue para acessar." 
            });
        }

        req.user = decoded;
        next();
    });
}

module.exports = authMiddleware;