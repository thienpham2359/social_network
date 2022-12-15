import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFeedDto {
  @IsNotEmpty()
  @MaxLength(280)
  content: string;
}
