const jwt = require('jsonwebtoken')

//Autherization users
module.exports = (req, res, next) => {
    const authHeader = req.get('token');
    if (!authHeader) {
        const error = new Error('Not autenticated');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'mysupersecret')
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}
// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//     const authHeader = req.get('token');
//     if (authHeader) {
//         // const token = authHeader.split(" ")[1];
//         jwt.verify(token, "mysupersecret", (err, user) => {
//           if (err) res.status(403).json("Token is not valid!");
//           req.user = user;
//           next();
//         });
//     } else {
//         return res.status(401).json("You are not authenticated!");
//     }
// };

// const verifyTokenAndAuthorization = (req, res, next) => {
//     verifyToken(req, res, () => {
//         if (req.user.id === req.params.id || req.user.permission === 'Admin') {
//             next();
//         } else {
//             res.status(403).json("You are not alowed to do that!");
//         }
//     });
// };

// const verifyTokenAndAdmin = (req, res, next) => {
//     verifyToken(req, res, () => {
//         if (req.user.permission ==='Admin') {
//             next();
//         } else {
//             res.status(403).json("You are not alowed to do that!");
//         }
//     });
// };

// // const verifyTokenAndDoctor = (req, res, next) => {
// //     verifyToken(req, res, () => {
// //         if (req.user.permission === 'Doctor') {
// //             next();
// //         } else {
// //             res.status(403).json("You are not alowed to do that!");
// //         }
// //     });
// // };

// module.exports = {
//     verifyToken,
//     verifyTokenAndAuthorization,
//     verifyTokenAndAdmin,
// };