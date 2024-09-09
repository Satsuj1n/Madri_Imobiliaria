const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const Cliente = require("../models/cliente");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const cliente = await Cliente.findById(jwt_payload.id);
        if (cliente) {
          return done(null, cliente);
        }
        return done(null, false);
      } catch (error) {
        console.error(error);
        return done(error, false);
      }
    })
  );
};
