import { Injectable } from '@nestjs/common';
import { CreateCatToyDto } from './dto/create-cat_toy.dto';
import { UpdateCatToyDto } from './dto/update-cat_toy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CatToy } from './entities/cat_toy.entity';
import { Repository } from 'typeorm';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class CatToysService {
    constructor(
      @InjectRepository(CatToy)
      private cattoyRepository : Repository<CatToy>
    ){}
    
    create(toy: CatToy): Promise<CatToy> {
      return this.cattoyRepository.save(toy);
    }

  
  

  findAll() {
    return `This action returns all catToys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catToy`;
  }

  update(id: number, updateCatToyDto: UpdateCatToyDto) {
    return `This action updates a #${id} catToy`;
  }

  remove(id: number) {
    return `This action removes a #${id} catToy`;
  }
}
