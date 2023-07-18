import { IsOptional, IsNumber, IsString } from 'class-validator';

export class EditReviewDto {
  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
