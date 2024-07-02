import { Body, Controller, Post } from '@nestjs/common';
import { ShortenService } from './shorten.service';
import { GetShortUrlDto } from './dtos/get-short-url.dto';

@Controller('shorten')
export class ShortenController {
  constructor(private readonly shortenService: ShortenService) {}

  @Post('')
  async getShortUrl(@Body() getShortUrlDto: GetShortUrlDto) {
    return this.shortenService.getShortUrl(getShortUrlDto);
  }
}
