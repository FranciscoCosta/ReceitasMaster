import {
  Controller,
  Get,
  UseGuards,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto, EditRecipeDto } from './dto';
import { GetUser } from '../auth/decorator';

@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @UseGuards(JwtGuard)
  @Get('my-recipes')
  getMyRecipes(@GetUser('id') userId: number) {
    return this.recipeService.getMyRecipes(userId);
  }

  @Get()
  getRecipes() {
    return this.recipeService.getRecipes();
  }

  @Get(':id')
  getRecipeById(@Param('id', ParseIntPipe) recipeId: number) {
    return this.recipeService.getRecipeById(recipeId);
  }
  @UseGuards(JwtGuard)
  @Post()
  createRecipe(
    @GetUser('id') userId: number,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    return this.recipeService.createRecipe(userId, createRecipeDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  editRecipeById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
    @Body() editRecipeDto: EditRecipeDto,
  ) {
    return this.recipeService.editRecipeById(userId, recipeId, editRecipeDto);
  }

  @HttpCode(204)
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteRecipeById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
  ) {
    return this.recipeService.deleteRecipeById(userId, recipeId);
  }
}
