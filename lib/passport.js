import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { ObjectId } from 'mongodb';

passport.serializeUser((user, done) => {
  // eslint-disable-next-line no-underscore-dangle
  done(null, user._id.toString());
});

passport.deserializeUser((req, id, done) => {
  req.db
    .collection('users')
    .findOne(ObjectId(id))
    .then((user) => done(null, user));
});

passport.use(
  new LocalStrategy(
    { usernameField: 'username', passReqToCallback: true },
    async (req, username, password, done) => {
      const user = await req.db.collection('users').findOne({ username });
      if (user && (await bcrypt.compare(password, user.password))) {
        done(null, user);
      } else done(null, false);
    }
  )
);

export default passport;
