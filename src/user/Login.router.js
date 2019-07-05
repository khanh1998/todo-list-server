import jwt from 'jsonwebtoken';

export default (app, passport) => {
  app.post('/login', (req, res, next) => {
    passport.authenticate('getJwtToken', { session: false }, async (error, user, info) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      if (user) {
        const { _id, username } = user;
        const payload = {
          id: _id,
          username,
        };
        try {
          const jwtToken = await jwt.sign(payload, process.env.SECRET);
          res.status(200).json({
            jwtToken,
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
          message: 'Unauthenticated!',
        });
      }
    })(req, res, next);
  });
};
