
import { Cat } from 'src/cats/entities/cat.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('breed')
export class Breed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  origin: string;

  @OneToMany(()=> Cat ,(cats) => cats.breed)
  cats:Cat;
  
}
