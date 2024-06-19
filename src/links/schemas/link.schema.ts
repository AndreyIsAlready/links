import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LinkDocument = Link & Document;

@Schema()
export class Link {
	@Prop({ type: Types.ObjectId, default: new Types.ObjectId() })
	_id: Types.ObjectId;
	
	@Prop({ required: true, unique: true })
	value: string;
	
	@Prop({ default: true })
	isActive: boolean;
}

export const LinkSchema = SchemaFactory.createForClass(Link);