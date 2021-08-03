import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.delete((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;
