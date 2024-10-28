import { Breed } from 'src/breed/entities/breed.entity';
import { CatToy } from 'src/cat_toys/entities/cat_toy.entity';
import { OwnerEntity } from 'src/owner/entities/owner.entity';
import { toy } from 'src/toy/entities/toy.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('cats')
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  age: number;
   
  @ManyToOne(() => OwnerEntity, (owner) => owner.cats)
  owner: OwnerEntity;

  @ManyToOne(()=> Breed , (breed)=>breed.cats)
  breed:Breed;
  
 @OneToMany(()=> CatToy, (catToy)=> catToy.toy)
 catToy : CatToy;
}
