import { Module } from '@nestjs/common';
import { CatToysService } from './cat_toys.service';
import { CatToysController } from './cat_toys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatToy } from './entities/cat_toy.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CatToy])],
  controllers: [CatToysController],
  providers: [CatToysService],
})
export class CatToysModule {}
