

import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 4,
    message : {
        msg : "muitas tentativas , tente novamente mais tarde"
    }
})

const requestLimiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 4,
    message : {
        msg : "muitas tentativas , tente novamente mais tarde"
    }
})





export default loginLimiter;
export default requestLimiter;
