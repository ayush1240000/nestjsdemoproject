import { Controller, Get, Param, Post, Body, Delete, Query } from '@nestjs/common';
import { BreedService } from './breed.service';
import { Breed} from './entities/breed.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Controller('breeds')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Get()
  findAll(): Promise<Breed[]> {
    return this.breedService.findAll();
  }

  @Get('/catcount')
  getbreedwithCatcount(@Paginate() query: PaginateQuery): Promise<Paginated<Breed>>{
    return this.breedService.getbreedwithCatcount(query);
  }

  // @Get('with-cat-count')  // Defines the endpoint as /breeds/with-cat-count
  // async getBreedsWithCatCount(
  //   @Query ('page') page: number = 1,   // Default page is 1
  //   @Query('limit') limit: number = 10 // Default limit is 10
  // ): Promise<Paginated<Breed>> {
  //   limit = limit > 100 ? 100 : limit; // Ensure the limit doesn't exceed 100

  //   return this.breedService.getBreedsWithCatCount(page, limit);
  // }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Breed> {
    return this.breedService.findOne(id);
  }

  @Post()
  create(@Body() breed: Breed): Promise<Breed> {
    return this.breedService.create(breed);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.breedService.remove(id);
  }
}
