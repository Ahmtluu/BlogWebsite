import { Module } from '@nestjs/common';
import { JWTStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '2days' },
          }),
],
    providers: [JWTStrategy],
})
export class AuthModule {}