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
import { ReviewService } from './review.service';
import { CreateReviewDto, EditReviewDto } from './dto';
import { GetUser } from '../auth/decorator';

@Controller('Reviews')
export class ReviewController {
  constructor(private ReviewService: ReviewService) {}

  @Get(':id')
  getReviews(@Param('id', ParseIntPipe) recipeId: number) {
    return this.ReviewService.getReviews(recipeId);
  }

  @Post(':id')
  createReview(
    @Param('id', ParseIntPipe) recipeId: number,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.ReviewService.createReview(recipeId, createReviewDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  editReviewById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) ReviewId: number,
    @Body() editReviewDto: EditReviewDto,
  ) {
    return this.ReviewService.editReviewById(userId, ReviewId, editReviewDto);
  }

  @HttpCode(204)
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteReviewById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) ReviewId: number,
  ) {
    return this.ReviewService.deleteReviewById(userId, ReviewId);
  }
}
