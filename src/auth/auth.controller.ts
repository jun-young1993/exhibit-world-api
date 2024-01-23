import { Body, Controller, Get, Post, Req, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "../config/config.type";
import { AuthGuard } from "./auth.guard";

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<AllConfigType>
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto){

    const user = await this.usersService.login(loginUserDto);
    const jwtConfig = this.configService.get('jwt');
    const accessToken = await this.jwtService.signAsync(user.toJSON());
    
    return {
      access_token: accessToken
    };
  }
  
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }
}
