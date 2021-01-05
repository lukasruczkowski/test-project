import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { JwtStrategy } from './common/passport/jwt.strategy';
import { AppController } from './controllers/app.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
  ],
  providers: [
    JwtStrategy,
    UserService,
    UserRepository,
    AuthService,
    JwtService,
  ],
})
export class AppModule {}
