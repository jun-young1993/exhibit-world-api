import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GithubService } from './github.service';
import { CreateGithubDto } from './dto/create-github.dto';
import { UpdateGithubDto } from './dto/update-github.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';

@ApiTags('Github')
@Controller({
	path: 'github',
	version: '1'
})
export class GithubController {
	constructor(
		private readonly githubService: GithubService
	){}

	@Get('releases')
	@Public()
	@ApiOperation({
		summary: 'Retrieve a github Release',
		description: 'Retrieves a existing github Release.',
	})
	findAllByRlease(){
		return this.githubService.findAllByRelease();
	}


	@Get('release')
	@Public()
	@ApiOperation({
		summary: 'Retrieve a github Release',
		description: 'Retrieves a existing github Release.',
	})
	findOneByRelease(){
		return this.githubService.findOneByRelease();
	}
}
