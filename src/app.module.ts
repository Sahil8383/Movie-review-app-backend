import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [DatabaseModule, MovieModule, ReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
