import { Review } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString({ each: true })
  ingredients: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  instructions: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  categories: string[];

  @IsNotEmpty()
  @IsString()
  tumbnail: string;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsNumber()
  @IsNotEmpty()
  serves: number;

  userId: number;
}
