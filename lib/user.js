import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import connectToDatabase from './mongodb';

export async function findUser(username) {
  const { db } = await connectToDatabase();

  const user = await db.collection('users').find({ username }).toArray();
  return user;
}

export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex');
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}

export async function createUser({ username, password }) {
  const { db } = await connectToDatabase();

  const isFound = await findUser(username);
  if (isFound.length > 0) {
    return null;
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    username,
    hash,
    salt,
  };
  await db.collection('users').insertOne(user);

  return { username, createdAt: Date.now() };
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
