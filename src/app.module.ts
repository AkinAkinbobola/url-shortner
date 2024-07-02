import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ShortenModule } from './shorten/shorten.module';

@Module({
  imports: [PrismaModule, ShortenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
