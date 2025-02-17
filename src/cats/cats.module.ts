import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { ToyModule } from 'src/toy/toy.module';
import { toy } from 'src/toy/entities/toy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat,toy])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
