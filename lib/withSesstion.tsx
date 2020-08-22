import {withIronSession} from 'next-iron-session';
import {GetServerSideProps, NextApiHandler} from 'next';

export function withSession(handler: NextApiHandler | GetServerSideProps) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'blog',
    ttl: 3600 * 24,
    cookieOptions: {
      secure: false,
      httpOnly: true,
    }
  });
}