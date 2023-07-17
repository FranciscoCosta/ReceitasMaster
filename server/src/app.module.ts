import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import AuthModule from './auth/auth.module';

@Module({
  imports: [AuthModule, UserModule, RecipeModule],
})
export class AppModule {}
