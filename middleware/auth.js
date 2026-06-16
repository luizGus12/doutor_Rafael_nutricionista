import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            msg: "acesso negado"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        console.log("Erro ao validar token:", error.message);

        return res.status(401).json({
            msg: "token inválido"
        });

    }

};
