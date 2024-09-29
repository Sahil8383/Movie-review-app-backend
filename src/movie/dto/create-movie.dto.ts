import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  releaseDate: Date;

  @IsOptional()
  averageRating?: number | null;
}
