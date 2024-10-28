import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { toy } from './entities/toy.entity';
import { ToyService } from './toy.service';
import { ToyController } from './toy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([toy])],
  providers: [ToyService],
  controllers: [ToyController],
})
export class ToyModule {}
