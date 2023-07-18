import { Injectable } from '@nestjs/common';
import { EditRecipeDto, CreateRecipeDto } from './dto';
import PrismaService from '../prisma/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}
  getRecipes() {
    return this.prisma.recipe.findMany();
  }
  async createRecipe(userId: number, dto: CreateRecipeDto) {
    const recipe = await this.prisma.recipe.create({
      data: { userId, ...dto } as any,
    });
    return recipe;
  }

  getRecipeById(recipeId: number) {}

  editRecipeById(userId: number, recipeId: number, dto: EditRecipeDto) {}

  deleteRecipeById(userId: number, recipeId: number) {}
}
