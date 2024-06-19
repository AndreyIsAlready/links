import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Link, LinkSchema } from "./schemas/link.schema";
import { LinkRepository } from "./links.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }])
  ],
  providers: [LinksService, LinkRepository],
  controllers: [LinksController]
})
export class LinksModule {}
