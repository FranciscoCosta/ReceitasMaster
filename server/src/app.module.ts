import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';
import { ReviewModule } from './review/review.module';
import AuthModule from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RecipeModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ReviewModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class AppModule {}
