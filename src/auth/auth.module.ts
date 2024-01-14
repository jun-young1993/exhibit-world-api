import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AllConfigType } from "../config/config.type";

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async function(configService: ConfigService<AllConfigType>){
        const jwtConfig = configService.get('jwt');
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
  exports: [AuthService]
})
export class AuthModule {}
