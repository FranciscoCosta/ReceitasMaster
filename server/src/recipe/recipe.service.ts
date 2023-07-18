import { Injectable } from '@nestjs/common';
import { EditRecipeDto, CreateRecipeDto } from './dto';
import PrismaService from '../prisma/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}
  getRecipes() {
    return this.prisma.recipe.findMany();
  }

  getRecipeById(recipeId: number) {}

  createRecipe(userId: number, dto: CreateRecipeDto) {}

  editRecipeById(userId: number, recipeId: number, dto: EditRecipeDto) {}

  deleteRecipeById(userId: number, recipeId: number) {}
}
