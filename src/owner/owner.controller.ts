import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { PaginateQuery, Paginated, Paginate } from 'nestjs-paginate';
import { OwnerEntity } from './entities/owner.entity';

@Controller('owners')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto): Promise<OwnerEntity> {
    return this.ownerService.create(createOwnerDto);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<OwnerEntity>> {
    return this.ownerService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<OwnerEntity> {
    return this.ownerService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateOwnerDto: UpdateOwnerDto): Promise<OwnerEntity> {
    return this.ownerService.update(id, updateOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.ownerService.remove(id);
  }
}
