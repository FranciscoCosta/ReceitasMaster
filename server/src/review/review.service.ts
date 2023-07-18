import { ForbiddenException, Injectable } from '@nestjs/common';
import { EditReviewDto, CreateReviewDto } from './dto';
import PrismaService from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}
  async getReviews(recipeId: number) {
    const reviews = await this.prisma.review.findMany({
      where: { recipeId },
    });

    return reviews;
  }

  async createReview(recipeId: number, dto: CreateReviewDto) {
    const Review = await this.prisma.review.create({
      data: { ...dto, recipeId } as any,
    });

    const recipeTarget = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    const totalRating = recipeTarget.totalRating + Review.rating;
    const totalReviews = recipeTarget.totalReviews + 1;
    const rating = totalRating / totalReviews;

    await this.prisma.recipe.update({
      where: { id: recipeId },
      data: { totalRating, totalReviews, rating },
    });

    return Review;
  }

  async editReviewById(userId: number, ReviewId: number, dto: EditReviewDto) {
    const Review = await this.prisma.review.findUnique({
      where: { id: ReviewId },
    });
    if (!Review || Review.userId !== userId) {
      throw new ForbiddenException('Acesso negado');
    }
    await this.prisma.review.update({
      where: { id: ReviewId },
      data: dto,
    });

    const recipeTarget = await this.prisma.recipe.findUnique({
      where: { id: Review.recipeId },
    });
    if (Review.rating) {
      const totalRating = recipeTarget.totalRating - Review.rating + dto.rating;
      const rating = totalRating / recipeTarget.totalReviews;
      return await this.prisma.recipe.update({
        where: { id: Review.recipeId },
        data: { totalRating, rating },
      });
    }
  }

  async deleteReviewById(userId: number, ReviewId: number) {
    const Review = await this.prisma.review.findUnique({
      where: { id: ReviewId },
    });
    if (Review.userId !== userId) {
      throw new ForbiddenException('Acesso negado');
    }

    const recipeTarget = await this.prisma.recipe.findUnique({
      where: { id: Review.recipeId },
    });
    const totalRating = recipeTarget.totalRating - Review.rating;
    const totalReviews = recipeTarget.totalReviews - 1;
    const rating = totalRating / totalReviews;

    await this.prisma.recipe.update({
      where: { id: Review.recipeId },
      data: { totalRating, totalReviews, rating },
    });

    return await this.prisma.review.delete({
      where: { id: ReviewId },
    });
  }
}
