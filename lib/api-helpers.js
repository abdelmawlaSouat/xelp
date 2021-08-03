export default function extractUser(req) {
  if (!req.user) return null;

  const { username, email } = req.user;
  return {
    username,
    email,
  };
}
