import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LinksModule } from './links/links.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    LinksModule,
    MongooseModule.forRoot(process.env.MONGO),
  ],
})
export class AppModule {}
