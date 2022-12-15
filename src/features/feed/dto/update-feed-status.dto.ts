import { IsNotEmpty } from 'class-validator';

export class UpdateFeedStatusDto {
  @IsNotEmpty()
  isActive: boolean;
}
