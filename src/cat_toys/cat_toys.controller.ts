import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatToysService } from './cat_toys.service';
import { CreateCatToyDto } from './dto/create-cat_toy.dto';
import { UpdateCatToyDto } from './dto/update-cat_toy.dto';

@Controller('cat-toys')
export class CatToysController {
  constructor(private readonly catToysService: CatToysService) {}

  @Post()
  create(@Body() createCatToyDto: CreateCatToyDto) {
    return this.catToysService.create(createCatToyDto);
  }

  @Get()
  findAll() {
    return this.catToysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catToysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatToyDto: UpdateCatToyDto) {
    return this.catToysService.update(+id, updateCatToyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catToysService.remove(+id);
  }
}
