import { Body, Controller, Get, Ip, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "../config/config.type";
import { AuthGuard } from "./auth.guard";
import { Response, Request } from "express";
import { AuthConstant } from "./auth.constanse";
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
  async login(
    @Body() loginUserDto: LoginUserDto, 
    @Res({ passthrough: true }) response: Response,
    @Ip() ip
  ){

    const user = await this.usersService.login(loginUserDto);
    user.loginIp = ip;

    const userJson = user.toJSON();
    delete userJson.password;
    delete user.password;

    const accessToken = await this.jwtService.signAsync(userJson);
    
    await this.usersService.update(user);

    const decodeToeken = this.jwtService.decode(accessToken);
    console.log(decodeToeken);
    response.cookie(AuthConstant.AUTHORIZATION,accessToken, {
      secure: true,
      httpOnly: true,
      path: '/',
      expires: new Date(decodeToeken.exp * 1000),
      sameSite: "none"
    });

    return user;
  }
  
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() request){
    return request.user;
  }
}
