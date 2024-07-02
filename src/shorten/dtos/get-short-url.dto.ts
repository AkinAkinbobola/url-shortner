import { IsUrl } from 'class-validator';

export class GetShortUrlDto {
  @IsUrl()
  url: string;
}
