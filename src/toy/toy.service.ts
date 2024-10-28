import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { toy } from './entities/toy.entity';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class ToyService {
  constructor(
    @InjectRepository(toy)
    private readonly toyRepository: Repository<toy>,
  ) {}

  // findAll(): Promise<toy[]> {
  //   return this.toyRepository.find();
  // }

  findOne(id: number): Promise<toy> {
    return this.toyRepository.findOne({ where: { id } });
  }

  create(toy: toy): Promise<toy> {
    return this.toyRepository.save(toy);
  }

  async remove(id: number): Promise<void> {
    await this.toyRepository.delete(id);
  }

  findAll(query: PaginateQuery): Promise<Paginated<toy>> {
    return paginate(query, this.toyRepository, {
      sortableColumns: ['name','id','type'],
     // Relational search with Cat entity
      filterableColumns: {
    
        'name' : true
      },
      defaultSortBy: [['id', 'ASC']]
    });
  }

//   select  t.name,c.name from toys t 
// left join cats_toys_toys ct on t.id= ct.toy_id
// left join cats c on c.id= ct.cat_id
// where c.name= 'persain' ;

  async gettoysbycat(catId :number , query: PaginateQuery) : Promise<Paginated<toy>> {
    const queryBuilder = this.toyRepository.createQueryBuilder('toys')
    .leftJoin('toys.CatToy','CatToy')
    .where('CatToy.catId = :catId',{catId})
  // Use the paginate function to apply pagination, sorting, and filtering
  const result = await paginate<toy>(query, queryBuilder, {
    sortableColumns: ['name'],  // Allow sorting by breed name
    filterableColumns: {
      'name': [FilterOperator.EQ, FilterOperator.IN],  // Filter options for breed name
    }
  });   
  

  return result;  // Return the paginated result
}
}
