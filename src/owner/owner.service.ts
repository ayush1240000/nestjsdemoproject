import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerEntity } from './entities/owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly ownerRepository: Repository<OwnerEntity>,
  ) {}

  create(createOwnerDto: CreateOwnerDto): Promise<OwnerEntity> {
    const owner = this.ownerRepository.create(createOwnerDto);
    return this.ownerRepository.save(owner);
  }

  findAll(query: PaginateQuery): Promise<Paginated<OwnerEntity>> {
    return paginate(query, this.ownerRepository, {
      sortableColumns: ['name','id'],
      relations: ['cats'], // Relational search with Cat entity
      filterableColumns: {
        'cats.age': [FilterOperator.IN],
        'cats.name' : true
      },
      defaultSortBy: [['id', 'ASC']]
    });
  }

  findOne(id: number): Promise<OwnerEntity> {
    return this.ownerRepository.findOne({ where: { id }, relations: ['cats'] });
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto): Promise<OwnerEntity> {
    await this.ownerRepository.update(id, updateOwnerDto);
    return this.ownerRepository.findOne({ where: { id }, relations: ['cats'] });
  }

  async remove(id: number): Promise<void> {
    await this.ownerRepository.delete(id);
  }
}
