import { Review } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditRecipeDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString({ each: true })
  ingredients?: string[];

  @IsOptional()
  @IsString({ each: true })
  instructions?: string[];

  @IsOptional()
  @IsString({ each: true })
  categories?: string[];

  @IsOptional()
  @IsString()
  tumbnail?: string;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsOptional()
  reviews?: Review[];

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsNumber()
  servings?: number;
}
