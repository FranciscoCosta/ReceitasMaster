import { ForbiddenException, Injectable } from '@nestjs/common';
import { EditRecipeDto, CreateRecipeDto } from './dto';
import PrismaService from '../prisma/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}
  getRecipes() {
    return this.prisma.recipe.findMany();
  }

  async getMyRecipes(userId: number) {
    const recipes = await this.prisma.recipe.findMany({
      where: { userId },
    });
    return recipes;
  }

  async createRecipe(userId: number, dto: CreateRecipeDto) {
    const recipe = await this.prisma.recipe.create({
      data: { userId, ...dto } as any,
    });
    return recipe;
  }

  getRecipeById(recipeId: number) {
    return this.prisma.recipe.findUnique({
      where: { id: recipeId },
    });
  }

  async editRecipeById(userId: number, recipeId: number, dto: EditRecipeDto) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
    });
    if (!recipe || recipe.userId !== userId) {
      throw new ForbiddenException('Acesso negado');
    }

    return this.prisma.recipe.update({
      where: { id: recipeId },
      data: { ...dto } as any,
    });
  }

  async deleteRecipeById(userId: number, recipeId: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
    });
    if (recipe.userId !== userId) {
      throw new ForbiddenException('Acesso negado');
    }
    return this.prisma.recipe.delete({
      where: { id: recipeId },
    });
  }
}
