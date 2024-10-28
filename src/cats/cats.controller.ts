import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  public async findAll(@Paginate() query: PaginateQuery) : Promise<Paginated<Cat>> {
    return this.catsService.findAll(query);
  }

  @Get('owner/:ownerId')
  public async findCatsByOwner(@Paginate() query: PaginateQuery, @Param('ownerId') ownerId: number,) : Promise<Paginated<Cat>> {
    return this.catsService.findCatsByOwner(ownerId,query);
  }

  @Get('toy/:toyId')
  public async getCatsByToy(@Paginate() query: PaginateQuery, @Param('toyId') toyId: number,) : Promise<Paginated<Cat>> {
    return this.catsService.getCatsByToy(toyId,query);
  }

  @Get('breed/:id')
  public async findCatsByBreed(@Paginate() query: PaginateQuery, @Param('id') id: number,) : Promise<Paginated<Cat>> {
    return this.catsService.findCatsByBreed(id,query);
  }

  // @Post(':catId/toys/:toyId')
  // addToyToCat(@Param('catId') catId: number, @Param('toyId') toyId: number) {
  //   return this.catsService.addToyToCat(+catId, +toyId)
  // };

  @Post()
  create(@Body() CreateCatDto: CreateCatDto) {
    return this.catsService.create(CreateCatDto);
  }

}
