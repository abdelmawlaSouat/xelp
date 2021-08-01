import { createUser } from '../../lib/user';

export default async function signup(req, res) {
  try {
    const user = await createUser(req.body);
    // console.log('user: ', user);
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
