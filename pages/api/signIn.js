import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import extractUser from '../../lib/api-helpers';
import passport from '../../lib/passport';

const handler = nextConnect();

handler.use(middleware);
handler.post(passport.authenticate('local'), (req, res) => {
  res.json({ user: extractUser(req.user) });
});

export default handler;
