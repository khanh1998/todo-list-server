import jwt from 'jsonwebtoken';
import constant from '../configuration/constant';

export default (app, passport) => {
  app.post('/login', (req, res, next) => {
    passport.authenticate('getJwtToken', { session: false }, async (error, user, info) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      const expiresTime = 1 * 24 * 60 * 60;
      if (user) {
        const { _id, username } = user;
        const payload = {
          id: _id,
          username,
        };
        const options = {
          expiresIn: '1d',
          issuer: constant.HOST,
        };
        try {
          const jsonwebtoken = await jwt.sign(payload, constant.SECRET, options);
          res.status(200).json({
            jwt: jsonwebtoken,
          });
        } catch (errorJwt) {
          res.status(500).json({
            success: false,
            message: errorJwt.message,
          });
        }
      } else {
        res.status(401).json({
          success: false,
          message: 'Unregister user!',
        });
      }
    })(req, res, next);
  });
};
