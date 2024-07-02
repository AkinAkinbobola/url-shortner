import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetShortUrlDto } from './dtos/get-short-url.dto';
import { configDotenv } from 'dotenv';

const { nanoid } = require('fix-esm').require('nanoid');
configDotenv();

@Injectable()
export class ShortenService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async getOriginalUrl(shortUrl: string) {
    const original = await this.prismaService.url.findFirst({
      where: {
        shortUrl,
      },
    });

    if (!original) throw new NotFoundException('This is not a valid url');

    return {
      originalUrl: original.originalUrl,
    };
  }

  async getShortUrl(data: GetShortUrlDto) {
    const { url } = data;
    const baseUrl = process.env.BASE_URL;
    const isDuplicate = await this.prismaService.url.findFirst({
      where: {
        originalUrl: url,
      },
    });

    if (isDuplicate) {
      await this.prismaService.url.update({
        where: {
          id: isDuplicate.id,
        },
        data: {
          clicks: {
            increment: 1,
          },
        },
      });
      return {
        originalUrl: isDuplicate.originalUrl,
        shortUrl: `${baseUrl}/${isDuplicate.shortUrl}`,
      };
    }

    const shortUrl = nanoid();
    await this.prismaService.url.create({
      data: {
        originalUrl: url,
        shortUrl,
      },
    });
    return {
      originalUrl: url,
      shortUrl: `${baseUrl}/${shortUrl}`,
    };
  }
}
