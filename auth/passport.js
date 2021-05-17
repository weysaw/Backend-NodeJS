const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models').User;
const llave = require('./llave');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = llave;

const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
    //Encuentra el usuario por el token mandando y decodificado
    const user = await User.findByPk(jwt_payload.id);
    next(null, (user) ? user : false);
});
//Usa la estrategia de autentificacion
passport.use(strategy);

module.exports = passport;