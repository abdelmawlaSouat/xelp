import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import bcrypt from 'bcryptjs';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  const { username, password } = req.body;
  const email = normalizeEmail(req.body.email);

  if (!isEmail(email)) {
    res.status(400).send({
      done: false,
      message: 'The email you entered is invalid.',
    });
    return;
  }

  if (!password || !username) {
    res.status(400).send({
      done: false,
      message: 'Missing field(s)',
    });
    return;
  }

  if ((await req.db.collection('users').countDocuments({ username })) > 0) {
    res.status(403).send({
      done: false,
      message: 'The username has already been used.',
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await req.db
    .collection('users')
    .insertOne({
      email,
      username,
      password: hashedPassword,
      createdAt: Date.now(),
    })
    .then(({ ops }) => ops[0]);

  res.status(201).json({
    done: true,
    message: 'Successful registration ! Please log in.',
  });
});

export default handler;
