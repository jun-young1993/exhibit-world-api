import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { AllConfigType } from "src/config/config.type";

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
		
		if(!('authorization' in request.headers)){
			throw new UnauthorizedException('authorization not found in header');
		}

		if(typeof request.headers?.authorization !== 'string'){
			throw new UnauthorizedException('authorization is not a string');
		}
	
		const [type, token] = request.headers?.authorization?.split(' ') ?? [];
		
		return type === 'Bearer' ? token : undefined;
	}
}