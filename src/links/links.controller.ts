import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { LinksService } from './links.service';
import { Types } from "mongoose";

@Controller('links')
export class LinksController {
	constructor(private readonly linksService: LinksService) {}
	
	@Post()
	async create(@Body('value') value: string): Promise<string> {
		try {
			return await this.linksService.createLink(value);
		} catch (e) {
			if (e.status) {
				throw new HttpException(e.response, e.status);
			}
			throw new HttpException('Внутренняя ошибка сервера', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get(':id')
	async get(@Param('id') id: Types.ObjectId): Promise<string> {
		try {
			return await this.linksService.getLink(id);
		} catch (e) {
			if (e.status) {
				throw new HttpException(e.response, e.status);
			}

			throw new HttpException('Внутренняя ошибка сервера', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
