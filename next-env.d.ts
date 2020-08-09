/// <reference types="next" />
/// <reference types="next/types/global" />
declare module 'next' {
  import {Session} from 'next-iron-session';

  interface NextApiRequest {
    session: Session
  }
}
