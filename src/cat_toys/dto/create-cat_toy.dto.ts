import { Cat } from "src/cats/entities/cat.entity";
import { toy } from "src/toy/entities/toy.entity";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateCatToyDto {
    @PrimaryGeneratedColumn()
    id :number;

    @Column()
    cat :Cat;

    @Column()
    toy :toy;


}
