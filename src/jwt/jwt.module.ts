import { Global, Module } from '@nestjs/common';

import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AllConfigType, JwtConfig } from "../config/config.type";
import { PassportModule } from '@nestjs/passport';
import { AuthConstant } from 'src/auth/auth.constanse';


@Global()
@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: AuthConstant.JWT }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async function(configService: ConfigService<AllConfigType>){
        const jwtConfig = configService.get<JwtConfig>(AuthConstant.JWT);
        return {
          global: true,
          secret: jwtConfig.secret,
          signOptions: jwtConfig.signOptions
        }
      },
    })
  ],
  exports: [PassportModule,JwtModule]
})
export class JwtAuthModule {}
