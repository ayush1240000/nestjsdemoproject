import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from './entities/breed.entity';
import { FilterOperator, Paginate, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  findAll(): Promise<Breed[]> {
    return this.breedRepository.find();
  }

  findOne(id: number): Promise<Breed> {
    return this.breedRepository.findOne({ where: { id } });
  }

  create(breed: Breed): Promise<Breed> {
    return this.breedRepository.save(breed);
  }

  async remove(id: number): Promise<void> {
    await this.breedRepository.delete(id);
  }
 
  //check this code with ayushh
    async getbreedwithCatcount(query: PaginateQuery): Promise<Paginated<Breed>> {
      // Create the query builder for the breed entity
      const queryBuilder = this.breedRepository.createQueryBuilder('breed')
        .leftJoin('breed.cats', 'cats')  // Perform a left join with the cats
        .addSelect('COUNT(cats.id)', 'catCount')  // Count the number of cats
        .groupBy('breed.id')              // Group by breed ID
        .addGroupBy('breed.name')
        .addGroupBy('breed.origin'); 

          // Group by breed name
    
      // Use the paginate function to apply pagination, sorting, and filtering
      const result = await paginate<Breed>(query, queryBuilder, {
        sortableColumns: ['name','origin'],  // Allow sorting by breed name
        filterableColumns: {
          'name': [FilterOperator.EQ, FilterOperator.IN],  // Filter options for breed name
        }
      });
    
      return result;  // Return the paginated result
    }
    
    

    
    

  }
    