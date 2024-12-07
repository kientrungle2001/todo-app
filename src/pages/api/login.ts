// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { JWTPayload, SignJWT } from 'jose';
import axios from '@/api/axiosInstance';
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
  axios.post('/auth/login', { username, password }).then(async (response) => {
    const token = await createToken(response.data);
    res.status(200).json({ token });
  }).catch((error: any) => {
    res.status(401).json({ message: error.response.data.message });
  });
};
