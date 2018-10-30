import { Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  public sign(payload: string | any | Buffer): string {
    return jwt.sign(payload, 'secret', {
      expiresIn: 3600,
    });
  }

  public verify<T extends object = any>(token: string): T {
    return jwt.verify(token, 'secret') as T;
  }

  public decode(
    token: string,
    options: jwt.DecodeOptions,
  ): null | { [key: string]: any } | string {
    return jwt.decode(token, options);
  }
}
