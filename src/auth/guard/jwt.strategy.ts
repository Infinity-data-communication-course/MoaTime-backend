import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthRepository } from '../auth.repository';
import { TokenSchema } from '../type/token-schema.type';
import { UserBaseInfo } from '../type/user-base-info.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  // 가져온 인증 데이터(userId)의 유효성 검사
  async validate(data: TokenSchema): Promise<UserBaseInfo> {
    const user = await this.authRepository.getUserById(data.userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
