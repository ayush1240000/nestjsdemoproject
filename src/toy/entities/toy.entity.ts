
import { CatToy } from 'src/cat_toys/entities/cat_toy.entity';
import { Cat } from 'src/cats/entities/cat.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('toys')
export class toy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type :string ;

  // Many-to-Many relationship with CatEntity
  @OneToMany(()=> CatToy, (catToy) => catToy.cat )
  catToy : CatToy;
  

  
}
