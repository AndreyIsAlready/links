import { Injectable, HttpException } from '@nestjs/common';
import { LinkRepository } from "./links.repository";
import { Types } from "mongoose";

@Injectable()
export class LinksService {
	constructor(private readonly linksRepository: LinkRepository) {}
	
	async createLink(value: string): Promise<string> {
		const link = await this.linksRepository.createLink(value);
		return `${process.env.DOMAIN}/links/${link._id}`;
	}

	async getLink(id: Types.ObjectId): Promise<string> {
		const _id = new Types.ObjectId(id);
		const link = await this.linksRepository.findLinkById(_id);
		if (!link || !link.isActive) {
			throw new HttpException( 'Link is invalid or has already been used', 400);
		}

		link.isActive = false;

		const update = await this.linksRepository.updateLink(_id, false);
		
		if (!update) {
			throw new HttpException( 'Link has not been updated', 400);
		}

		return link.value;
	}
}