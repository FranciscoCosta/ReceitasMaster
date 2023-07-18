import { Injectable } from '@nestjs/common';
import { EditRecipeDto, CreateRecipeDto } from './dto';

@Injectable()
export class RecipeService {
  getRecipes() {}

  getRecipeById(recipeId: number) {}

  createRecipe(userId: number, dto: CreateRecipeDto) {}

  editRecipeById(userId: number, recipeId: number, dto: EditRecipeDto) {}

  deleteRecipeById(userId: number, recipeId: number) {}
}
