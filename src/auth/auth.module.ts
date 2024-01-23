import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "../config/config.type";
import { PassportModule } from '@nestjs/passport';
import { AuthConstant } from './auth.constanse';


@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: AuthConstant.JWT }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async function(configService: ConfigService<AllConfigType>){
        const jwtConfig = configService.get(AuthConstant.JWT);
        return {
          global: true,
          secret: jwtConfig.secret,
          signOptions: jwtConfig.signOptions
        }
      },
      // useFactory: async (configService: ConfigService) => ({
      //   global: true,
      //   secret: configService.get('jwt.secret'),
      //   signOptions: configService.get('jwt.signOptions')
      // })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, PassportModule]
})
export class AuthModule {}
