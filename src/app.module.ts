import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { Cat } from './cats/entities/cat.entity';
// import { CatsModule } from './cats/cats.module';
import { OwnerModule } from './owner/owner.module';
import { OwnerEntity } from './owner/entities/owner.entity';
import { BreedModule } from './breed/breed.module';
import { ToyModule } from './toy/toy.module';
import { Breed } from './breed/entities/breed.entity';
import { toy } from './toy/entities/toy.entity';

// import { CattoyModule } from './cattoy/cattoy.module';
import { CatToysModule } from './cat_toys/cat_toys.module';
import { CatToy } from './cat_toys/entities/cat_toy.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ayush@1240',
      database: 'newwww',
      entities: [Cat,OwnerEntity,Breed,toy,CatToy],  
      synchronize: true, 
    }), CatsModule, OwnerModule, BreedModule, ToyModule, CatToysModule]

})
export class AppModule {}
