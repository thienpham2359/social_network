import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateFeedDto {
  @IsNotEmpty()
  @MaxLength(280)
  content: string;
}
