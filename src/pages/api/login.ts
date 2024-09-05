// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { JWTPayload, SignJWT } from 'jose';

async function createToken(user: JWTPayload | undefined) {
  const secret = new TextEncoder().encode('your_secret_key');
  
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);

  return token;
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  // Simple authentication (replace with your own logic)
  if (username === 'admin' && password === '123456') {
    let token = await createToken({ username });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
