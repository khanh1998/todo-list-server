import Passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import models from './loadModel';

const options = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const UserModel = models.User;
export default function () {
  Passport.use('jwt', new JWTStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await UserModel.findById(jwtPayload.id);
      if (user) {
        return done(null, user);
        // eslint-disable-next-line no-else-return
      } else {
        return done(null, false);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return done(error, false);
    }
  }));

  const optionsLocal = {
    usernameField: 'username',
    passwordField: 'password',
  };
  Passport.use('getJwtToken', new LocalStrategy(optionsLocal, async (username, password, done) => {
    try {
      const user = await UserModel.findOne({ username });
      if (user) {
        const matchPassword = await user.comparePassword(password);
        if (matchPassword) {
          return done(null, user);
        }
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }));

  return Passport;
}
