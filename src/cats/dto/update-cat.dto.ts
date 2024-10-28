import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';
import { DeepPartial } from 'typeorm';
import { OwnerEntity } from 'src/owner/entities/owner.entity';

export class UpdateCatDto extends PartialType(CreateCatDto) {


    readonly name?: string;
    readonly color?: string;
    readonly age?: number;
    owner:number; 
}


