import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShortenService } from './shorten.service';
import { GetShortUrlDto } from './dtos/get-short-url.dto';

@Controller('')
export class ShortenController {
  constructor(private readonly shortenService: ShortenService) {
  }

  @Post('')
  async getShortUrl(@Body() getShortUrlDto: GetShortUrlDto) {
    return this.shortenService.getShortUrl(getShortUrlDto);
  }

  @Get('/:originalUrl')
  async getOriginalUrl(@Param('originalUrl') originalUrl: string) {
    return this.shortenService.getOriginalUrl(originalUrl);
  }
}
