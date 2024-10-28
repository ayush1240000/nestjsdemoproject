import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cat } from '../../cats/entities/cat.entity'; // Assuming you have the Cat entity in the cat folder

@Entity('owner')
export class OwnerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Cat, (cat) => cat.owner) // Relational mapping
  cats: Cat[];
}
