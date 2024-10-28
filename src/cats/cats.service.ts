import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginateQuery, Paginated, FilterOperator } from 'nestjs-paginate';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { OwnerEntity } from 'src/owner/entities/owner.entity';
import { Breed } from 'src/breed/entities/breed.entity';
import { toy } from 'src/toy/entities/toy.entity';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
    @InjectRepository(toy)
     private readonly toyRepository: Repository<toy>,
  ) {}


  async create(createCatDto: CreateCatDto): Promise<Cat> { 
    const dinnerTable = this.catsRepository.create({
        ...createCatDto,
        owner: { id: createCatDto.owner } // Assuming createCatDto.owner is a number (ID)
    });

    // Save the new cat entity to the repository
    return await this.catsRepository.save(dinnerTable);
}

  async findAll(query: PaginateQuery): Promise<Paginated<Cat>> {
    return paginate(query, this.catsRepository, {
      sortableColumns: ['id', 'name', 'color', 'age'],
      searchableColumns: ['name'],
      relations:['owner'],
      select: ['id', 'name', 'color', 'age'],
      filterableColumns: {
        'age': true,
        'owner.name' :true
      },
      defaultSortBy: [['id', 'ASC']],
    });
  }

  async findOne(id: number) {
 // Correct way to use findOne
const cat = await this.catsRepository.findOne({ where: {id}, relations: ['toys'] });

    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }
  

//   async addToyToCat(catId: number, toyId: number) {
//    // Correct way to use findOne
// const cat = await this.catsRepository.findOne({ where: { id : catId }, relations: ['toys'] });

//     if (!cat) {
//       throw new NotFoundException(`Cat with ID ${catId} not found`);
//     }

//   const toy = await this.toyRepository.findOne({ where: { id : toyId }});
   
//     if (!toy) {
//       throw new NotFoundException(`Toy with ID ${toyId} not found`);
//     }

//     cat.toys.push(toy); // Add the toy to the cat's toys array
//     return this.catsRepository.save(cat);
//   }

  async findCatsByOwner(ownerId: number, query: PaginateQuery): Promise<Paginated<Cat>> {
    // Create a query builder for Cats
    const queryBuilder = this.catsRepository
      .createQueryBuilder('cats')
      .leftJoinAndSelect('cats.owner', 'owner') // Join with the Owner entity
      .where('cats.ownerId = :ownerId', { ownerId }); // Add a condition to filter by ownerId

    // Use the paginate function to apply pagination to the custom query
    const result = await paginate<Cat>(query, queryBuilder, {
      sortableColumns: ['name', 'age', 'owner.name'], // Define sortable columns
      filterableColumns: {
        age: [FilterOperator.EQ, FilterOperator.IN], // Allow filtering on age
        
      },
    });

    return result;
  }

  async findCatsByBreed(breedId: number, query: PaginateQuery): Promise<Paginated<Cat>> {
    const queryBuilder = this.catsRepository
    .createQueryBuilder('cats')
    .innerJoin('cats.breed','breed')
    .where('cats.breedId = :breedId',{breedId});

    const result = await paginate<Cat>(query, queryBuilder, {
      sortableColumns: ['name', 'age', 'breed.name'], // Define sortable columns
      filterableColumns: {
        'breed.name': [FilterOperator.EQ, FilterOperator.IN], // Allow filtering on age
    }
  });

    return result;
  }


  async getCatsByToy(toyId: number, query : PaginateQuery): Promise<Paginated<Cat>> {
    const queryBuilder = this.catsRepository.createQueryBuilder('cat')
      .innerJoin('cat.toys', 'toy')
      .where('toy.id = :toyId', { toyId })
      .orderBy('cat.name', 'ASC');
    
      const result = await paginate<Cat>(query, queryBuilder, {
        sortableColumns: ['name', 'age', 'breed.name'], // Define sortable columns
        filterableColumns: {
          'breed.name': [FilterOperator.EQ, FilterOperator.IN], // Allow filtering on age
      }
    });
  
      return result;
  }
  
}
