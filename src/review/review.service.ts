import { Injectable } from '@nestjs/common';
import { Review } from '@prisma/client';
import { CreateReviewDto } from './dto/create-review.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: DatabaseService) {}

  findAll(): Promise<Review[]> {
    return this.prisma.review.findMany({
      include: {
        movie: true, 
      },
    });
  }

  findByMovieId(movieId: number): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: { movieId },
      include: {
        movie: true,
      },
    });
  }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {

    const review = await this.prisma.review.create({
      data: createReviewDto,
    });

    await this.updateAverageRating(createReviewDto.movieId);

    return review;
  }

  private async updateAverageRating(movieId: number): Promise<void> {

    const reviews = await this.prisma.review.findMany({
      where: { movieId },
    });

    const averageRating = reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : null; 

    await this.prisma.movie.update({
      where: { id: movieId },
      data: { averageRating },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.review.delete({
      where: { id },
    });
  }
}
