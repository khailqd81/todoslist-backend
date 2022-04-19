const jwt = require("jsonwebtoken");

exports.isSignIn = async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
            if (decoded && decoded.id) {
                req.userId = decoded.id;
                return next();
            } else {
                return res.status(202).json({
                    message: "Wrong access token"
                })
            }
        } catch (error) {
            console.log("error in auth/isSignIn: ", error)
            return res.status(202).json({
                message: "Error verify access token"
            })
        }

    }
}