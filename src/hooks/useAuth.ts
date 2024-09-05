import { jwtVerify } from 'jose';

export async function verifyToken(token: string) {
  const secret = new TextEncoder().encode('your_secret_key');

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
