import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hard!to-guess_secret',
    });
  }

  async validate(payload: any) {
    console.log('in jwt strategy');
    const { _id, email, is_admin } = payload;
    console.log(payload);
    return { _id, email, is_admin };
  }
}
