import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ExtractJwt } from 'passport-jwt';


@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration :false,
        secretOrKey:  process.env.SECRET_KEY,
    });
  }

  async validate(payload:any) {
    return {userId: payload.sub, username: payload.username};
  }
}