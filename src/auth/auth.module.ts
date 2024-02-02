import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AllConfigType, JwtConfig } from "../config/config.type";
import { PassportModule } from '@nestjs/passport';
import { AuthConstant } from './auth.constanse';


@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: AuthConstant.JWT }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, PassportModule]
})
export class AuthModule {}
