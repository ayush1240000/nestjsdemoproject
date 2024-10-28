import { OwnerEntity } from "src/owner/entities/owner.entity";
import { DeepPartial } from "typeorm";

export class CreateCatDto {
    readonly name: string;
    readonly color: string;
    readonly age: number;
    owner: number; 
    breedId :number;
  }