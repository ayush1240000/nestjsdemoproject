import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cat } from '../../cats/entities/cat.entity';
import { toy } from '../../toy/entities/toy.entity'

@Entity('cattoy')
export class CatToy {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cat, (cat) => cat.id)
  cat: Cat;

  @ManyToOne(() => toy, (toy) => toy.id)
  toy: toy;

}
