// src/movie/movie.service.ts
import { Injectable } from '@nestjs/common';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MovieService {
  constructor(private prisma: DatabaseService) {}

  findAll(): Promise<Movie[]> {
    return this.prisma.movie.findMany({
      include: {
        reviews: true,
      },
    });
  }

  findOne(id: number): Promise<Movie> {
    return this.prisma.movie.findUnique({
      where: { id },
      include: {
        reviews: true,
      },
    });
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.prisma.movie.create({
      data: createMovieDto,
    });
  }

  async createMultiple(createMoviesDto: any): Promise<string> {
    // Extract movies from DTO
    const movies = createMoviesDto.movies.map(movie => ({
      name: movie.name,
      releaseDate: movie.releaseDate,
      averageRating: movie.averageRating,
    }));

    await this.prisma.movie.createMany({
      data: movies,
    });

    return 'Created Movies'
  }

  async update(id: number, updateMovieDto: Partial<CreateMovieDto>): Promise<Movie> {
    return this.prisma.movie.update({
      where: { id },
      data: updateMovieDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.review.deleteMany({
      where: { movieId: id },
    });

    await this.prisma.movie.delete({
      where: { id },
    });
  }
}
