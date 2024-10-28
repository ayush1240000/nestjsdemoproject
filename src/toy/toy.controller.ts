import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { ToyService } from './toy.service';
import { toy } from './entities/toy.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Controller('toys')
export class ToyController {
  constructor(private readonly toyService: ToyService) {}

  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<toy>> {
    return this.toyService.findAll(query);
  }
  @Get('cats/:catId')
  async gettoysbycat(@Paginate() query: PaginateQuery,@Param() catId: number ): Promise<Paginated<toy>> {
    return this.toyService.gettoysbycat(catId,query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<toy> {
    return this.toyService.findOne(id);
  }

  @Post()
  create(@Body() toy: toy): Promise<toy> {
    return this.toyService.create(toy);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.toyService.remove(id);
  }
}
