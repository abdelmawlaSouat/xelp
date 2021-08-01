import { getLoginSession } from '../../lib/auth';
import { findUser } from '../../lib/user';

export default async function user(req, res) {
  try {
    const session = await getLoginSession(req);
    const userData = (session && (await findUser(session))) ?? null;

    res.status(200).json({ userData });
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
