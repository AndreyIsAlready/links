import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Link, LinkDocument } from './schemas/link.schema';

@Injectable()
export class LinkRepository {
	constructor(@InjectModel(Link.name) private linkModel: Model<LinkDocument>) {}
	
	async createLink(value: string): Promise<Link> {
		return await this.linkModel.create({_id: new Types.ObjectId(), value });
	}
	
	async findLinkById(id: Types.ObjectId): Promise<Link | null> {
		return await this.linkModel.findOne({ _id: id }).exec();
	}
	
	async existLinkByValue(value: string): Promise<{ _id: Types.ObjectId | null }> {
		return await this.linkModel.exists({value});
	}
	
	async updateLink(id: Types.ObjectId, isActive: boolean): Promise<Link | null> {
		return await this.linkModel.findByIdAndUpdate(id, { isActive }, { new: true }).exec();
	}
}