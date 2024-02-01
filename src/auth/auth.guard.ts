import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { AllConfigType } from "src/config/config.type";
import { Request } from 'express';
import { AuthConstant } from "./auth.constanse";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService<AllConfigType>
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean>
	{
		const jwtConfig = this.configService.get('jwt');
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		console.log('token',token);
		if (!token) {
		  throw new UnauthorizedException();
		}
		try {
		  const payload = await this.jwtService.verifyAsync(
		    token,
		    {
		      secret: jwtConfig.secret
		    }
		  );
		
		  // 💡 We're assigning the payload to the request object here
		  // so that we can access it in our route handlers
		  request['user'] = payload;
		} catch (error) {
		  if(error.name === TokenExpiredError.name){
			
			throw new UnauthorizedException(TokenExpiredError.name)
		  }
		  throw error;
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		console.log(request.cookies);
		console.log(request.headers);
		if(!(AuthConstant.AUTHORIZATION in request.cookies)){
			throw new UnauthorizedException('authorization not found in header');
		}

		if(typeof request.cookies[AuthConstant.AUTHORIZATION] !== 'string'){
			throw new UnauthorizedException('authorization is not a string');
		}
		
		const [type, token] = request.cookies[AuthConstant.AUTHORIZATION]?.split(' ') ?? [];
		
		return type === 'Bearer' ? token : undefined;
	}
}